// Sends a WhatsApp confirmation to a customer after they submit the Book-a-demo form.
// Runs as a serverless function (Vercel: /api/whatsapp-confirm). Uses the WhatsApp Cloud API
// with an approved message template, because business-initiated messages must use one.
//
// Environment variables:
//   WA_TOKEN            permanent access token for the WhatsApp Business app
//   WA_PHONE_NUMBER_ID  the sender phone-number ID from WhatsApp Manager
//   WA_TEMPLATE         approved template name, e.g. "inquiry_received" (one {{1}} = customer name)
//   WA_TEMPLATE_LANG_EN template language code for English, default "en"
//   WA_TEMPLATE_LANG_AR template language code for Arabic, default "ar"
//   ALLOWED_ORIGIN      the site origin allowed to call this, e.g. "https://youclouduae.vercel.app"

const GRAPH = 'https://graph.facebook.com/v21.0';

module.exports = async function handler(req, res) {
  const origin = process.env.ALLOWED_ORIGIN || '';
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, detail: 'Method not allowed' });
  if (origin && req.headers.origin && req.headers.origin !== origin) {
    return res.status(403).json({ success: false, detail: 'Origin not allowed' });
  }

  const { WA_TOKEN, WA_PHONE_NUMBER_ID, WA_TEMPLATE } = process.env;
  if (!WA_TOKEN || !WA_PHONE_NUMBER_ID || !WA_TEMPLATE) {
    return res.status(500).json({ success: false, detail: 'WhatsApp is not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const to = String((body && body.to) || '').replace(/[^\d+]/g, '');
  const name = String((body && body.name) || '').trim().slice(0, 60) || 'there';
  const lang = body && body.language === 'ar' ? 'ar' : 'en';

  // UAE numbers only: +971 followed by 8–9 digits.
  if (!/^\+971\d{8,9}$/.test(to)) {
    return res.status(400).json({ success: false, detail: 'Invalid UAE WhatsApp number' });
  }

  const message = {
    messaging_product: 'whatsapp',
    to: to.replace('+', ''),
    type: 'template',
    template: {
      name: WA_TEMPLATE,
      language: { code: lang === 'ar' ? (process.env.WA_TEMPLATE_LANG_AR || 'ar') : (process.env.WA_TEMPLATE_LANG_EN || 'en') },
      components: [{ type: 'body', parameters: [{ type: 'text', text: name }] }]
    }
  };

  try {
    const r = await fetch(`${GRAPH}/${WA_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${WA_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(502).json({ success: false, detail: (j.error && j.error.message) || 'WhatsApp send failed' });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(502).json({ success: false, detail: 'WhatsApp send failed' });
  }
};
