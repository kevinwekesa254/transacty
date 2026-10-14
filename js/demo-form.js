/* Book-a-demo lead form (3 steps) in a modal. Posts to the Pulse lead-capture API.
   Adapted from the standalone youcloud lead form for the UAE market (en / ar). */
(function () {
  'use strict';

  var API = 'https://pulse.youcloudtech.com/api/public/lead-capture';
  var BRAND = 'youcloud', MARKET = 'uae', ATTR = 'yc_lead_attribution', MAX = 3;
  var CFG = { dial: '971', flag: '🇦🇪', ph: '50 123 4567' };
  var PRIVACY = 'privacy.html';
  // Every inquiry is emailed here (via FormSubmit; the first submission sends a one-time activation email to TO).
  var NOTIFY = { to: 'sales@youcloud.ae', cc: 'arun@youcloudpay.com' };
  // Serverless endpoint that sends the customer a WhatsApp confirmation (see api/whatsapp-confirm.js).
  var WA_CONFIRM_URL = '/api/whatsapp-confirm';
  // Device shown in the form, chosen by the button that opened it (data-device).
  var DEVICES = {
    y1000: ['images/desktop_-_1_9.webp', 'youcloud y1000 handheld POS'],
    y4000: ['images/desktop_-_1_10.webp', 'youcloud y4000 tablet POS on stand'],
    y5000: ['images/desktop_-_1_11.webp', 'youcloud y5000 dual-screen counter POS'],
    y7000: ['images/desktop_-_1_12.webp', 'youcloud y7000 self-service kiosk'],
    y10: ['images/desktop_-_1_13.webp', 'youcloud y10 QR SoundBox']
  };

  var L = {
    en: {
      stepOf: 'Step {n} of 3', nudge: 'For a better demo, fill all steps — you can still submit now.',
      s1label: 'Book a 15-min call', s1title: 'Everything your shop needs — <span class="lf-accent">in one place.</span>',
      s1sub: "Tell us the basics and we'll make your demo useful from the first minute.",
      shop: 'Your shop name', shopph: 'e.g. Al Noor Grocery', contact: 'Your name', contactph: 'e.g. Ahmed Khan', contactErr: 'Enter your name.',
      wa: 'WhatsApp number', phone: 'Phone number', sameAsPhone: 'WhatsApp number is the same as phone number',
      type: 'What kind of business?', retail: 'Retail / grocery', restaurant: 'Restaurant', other: 'Other', otherTypeph: 'e.g. Pharmacy / salon',
      consent: 'I agree that youcloud may contact me by WhatsApp or phone. <a target="_blank" href="' + PRIVACY + '">Privacy policy</a>',
      book: 'Book free 15-min call', continue: 'Continue', back: 'Back',
      s2label: 'Your setup', s2title: 'Tell us <span class="lf-accent">about your setup.</span>', s2sub: 'Three quick answers help us prepare the right demo.',
      size: 'Business size', smallTitle: 'Small — single shop', smallSub: 'Just me / small team', growingTitle: 'Growing — 2–5 outlets', growingSub: 'Multiple locations',
      enterpriseTitle: 'Enterprise — 6+ outlets', enterpriseSub: 'Chain / franchise',
      online: 'Do you sell online too?', onlineNo: 'No, just my shop', onlineYes: 'Yes, online too',
      s3label: 'Almost done · 30 seconds', s3title: 'What do you <span class="lf-accent">need help with?</span>', s3sub: "Pick what matters most. We'll walk through it on the call.",
      priorities: 'Top priorities', billing: 'Billing & stock', payments: 'Cards & wallets', branches: 'Manage branches', vat: 'VAT billing', payroll: 'Payroll', repeat: 'Repeat customers',
      notes: 'Anything else we should prepare?', optional: 'Optional', notesph: 'e.g. Need billing for two shops next month',
      send: 'Send my details', completeTitle: "You're all set.", completeCopy: 'Your request is submitted successfully. Our team will contact you shortly.',
      nameErr: 'Enter your shop name.', phoneErr: 'Enter a valid UAE number — 8 or 9 digits after +971.', whatsappErr: 'Enter a valid UAE WhatsApp number — 8 or 9 digits after +971.', typeErr: 'Choose your business type.',
      consentErr: 'Please agree to be contacted before submitting.', maxErr: 'Choose up to 3 priorities.', sizeErr: 'Choose your business size.', onlineErr: 'Tell us if you sell online.', needsErr: 'Choose at least one priority.', sending: 'Sending…',
      fail: "We couldn't send your details just now.", failMail: 'Email your request to us instead', close: 'Close',
      bookNow: 'Book my free 15-min call now', nudge: 'Short on time? Book now with these details — or continue so we can tailor your demo.'
    },
    ar: {
      stepOf: 'الخطوة {n} من 3', nudge: 'للحصول على عرض تجريبي أفضل، أكمل جميع الخطوات — يمكنك الإرسال الآن أيضاً.',
      s1label: 'احجز مكالمة لمدة 15 دقيقة', s1title: 'كل ما يحتاجه متجرك — <span class="lf-accent">في مكان واحد.</span>',
      s1sub: 'أخبرنا بالأساسيات وسنجعل عرضك التجريبي مفيداً من الدقيقة الأولى.',
      shop: 'اسم متجرك', shopph: 'مثال: بقالة النور', contact: 'اسمك', contactph: 'مثال: أحمد خان', contactErr: 'أدخل اسمك.',
      wa: 'رقم واتساب', phone: 'رقم الهاتف', sameAsPhone: 'رقم واتساب هو نفسه رقم الهاتف',
      type: 'ما نوع نشاطك؟', retail: 'تجزئة / بقالة', restaurant: 'مطعم', other: 'أخرى', otherTypeph: 'مثال: صيدلية / صالون',
      consent: 'أوافق على أن تتواصل معي youcloud عبر واتساب أو الهاتف. <a target="_blank" href="' + PRIVACY + '">سياسة الخصوصية</a>',
      book: 'احجز مكالمة مجانية لمدة 15 دقيقة', continue: 'متابعة', back: 'رجوع',
      s2label: 'إعداد نشاطك', s2title: 'أخبرنا <span class="lf-accent">عن إعدادك.</span>', s2sub: 'ثلاث إجابات سريعة تساعدنا على تجهيز العرض التجريبي المناسب.',
      size: 'حجم النشاط', smallTitle: 'صغير — متجر واحد', smallSub: 'أنا فقط / فريق صغير', growingTitle: 'نامٍ — 2–5 فروع', growingSub: 'مواقع متعددة',
      enterpriseTitle: 'مؤسسة كبرى — 6+ فروع', enterpriseSub: 'سلسلة / امتياز تجاري',
      online: 'هل تبيع عبر الإنترنت أيضاً؟', onlineNo: 'لا، متجري فقط', onlineYes: 'نعم، عبر الإنترنت أيضاً',
      s3label: 'على وشك الانتهاء · 30 ثانية', s3title: 'بماذا <span class="lf-accent">تحتاج المساعدة؟</span>', s3sub: 'اختر الأهم بالنسبة لك. سنتناوله خلال المكالمة.',
      priorities: 'الأولويات الرئيسية', billing: 'الفوترة والمخزون', payments: 'البطاقات والمحافظ', branches: 'إدارة الفروع', vat: 'فوترة ضريبة القيمة المضافة', payroll: 'رواتب الموظفين', repeat: 'العملاء المتكررون',
      notes: 'هل هناك ما يجب أن نجهزه أيضاً؟', optional: 'اختياري', notesph: 'مثال: أحتاج فوترة لمتجرين الشهر القادم',
      send: 'أرسل بياناتي', completeTitle: 'كل شيء جاهز.', completeCopy: 'تم إرسال طلبك بنجاح. سيتواصل معك فريقنا قريباً.',
      nameErr: 'أدخل اسم متجرك.', phoneErr: 'أدخل رقماً إماراتياً صالحاً — 8 أو 9 أرقام بعد ‎+971.', whatsappErr: 'أدخل رقم واتساب إماراتياً صالحاً — 8 أو 9 أرقام بعد ‎+971.', typeErr: 'اختر نوع نشاطك.',
      consentErr: 'يرجى الموافقة على التواصل قبل الإرسال.', maxErr: 'اختر حتى 3 أولويات.', sizeErr: 'اختر حجم نشاطك.', onlineErr: 'أخبرنا إن كنت تبيع عبر الإنترنت.', needsErr: 'اختر أولوية واحدة على الأقل.', sending: 'جارٍ الإرسال…',
      fail: 'تعذّر إرسال بياناتك الآن.', failMail: 'أرسل طلبك إلينا عبر البريد الإلكتروني', close: 'إغلاق',
      bookNow: 'احجز مكالمتي المجانية لمدة 15 دقيقة الآن', nudge: 'وقتك ضيق؟ احجز الآن بهذه البيانات — أو تابع لنجهّز عرضاً يناسبك.'
    }
  };

  function consentBox(n) {
    return '<label class="lf-consent" for="lfConsent' + n + '"><input id="lfConsent' + n + '" type="checkbox" checked><span data-lh="consent"></span></label>' +
      '<p class="lf-err" id="lfConsent' + n + 'Err" role="alert"></p>';
  }
  function actions(n, withContinue) {
    return '<div class="lf-actions">' +
      (withContinue ? '<button class="lf-btn lf-primary" id="lfContinue' + n + '" type="button" data-lt="continue"></button>' +
        (n === 1 ? '<button class="lf-btn lf-secondary" id="lfBookNow" type="button" data-lt="bookNow"></button><p class="lf-nudge" data-lt="nudge"></p>' : '')
        : '<button class="lf-btn lf-primary" id="lfSubmit" type="button" data-lt="send"></button>') +
      '<div class="lf-status" id="lfStatus' + n + '" role="status" aria-live="polite"></div></div>';
  }
  function choice(name, value, key, type, extra) {
    return '<label class="lf-choice' + (extra || '') + '"><input type="' + (type || 'radio') + '" name="' + name + '" value="' + value + '"><span data-lt="' + key + '"></span></label>';
  }
  function card(value, title, sub) {
    return '<label class="lf-card"><input type="radio" name="businessSize" value="' + value + '"><span class="lf-card-body"><strong data-lt="' + title + '"></strong><small data-lt="' + sub + '"></small></span></label>';
  }

  var wrap = document.createElement('div');
  wrap.innerHTML =
    '<div class="lf-modal" id="lead-modal" role="dialog" aria-modal="true" aria-label="Book a demo" aria-hidden="true">' +
    '<div class="lf-backdrop" data-lf-close></div>' +
    '<section class="lf-sheet">' +
      '<header class="lf-head">' +
        '<img src="assets/logo-hd.png?v=202610141205" alt="youcloud" class="lf-logo">' +
        '<div class="lf-head-right">' +
          '<div class="lf-langs" role="group" aria-label="Language"><button type="button" class="lf-lang" data-lfl="en">EN</button><button type="button" class="lf-lang" data-lfl="ar" lang="ar">عربي</button></div>' +
          '<button class="lf-x" type="button" data-lf-close aria-label="Close">×</button>' +
        '</div>' +
      '</header>' +
      '<div class="lf-progress-wrap" id="lfProgressWrap"><div class="lf-progress-head"><p class="lf-meta" id="lfStepMeta" aria-live="polite"></p></div>' +
        '<div class="lf-progress"><i></i><i></i><i></i></div></div>' +
      '<form id="lfForm" novalidate>' +
        '<div class="lf-hp" aria-hidden="true"><label for="lfWebsite">Website</label><input id="lfWebsite" tabindex="-1" autocomplete="off"></div>' +
        /* Step 1 */
        '<section class="lf-step" data-step="1">' +
          '<p class="lf-eyebrow" data-lt="s1label"></p><h2 data-lh="s1title"></h2><p class="lf-sub" data-lt="s1sub"></p>' +
          '<div class="lf-hero"><img id="lfDevice" src="images/desktop_-_1_10.webp" alt="youcloud y4000 tablet POS on stand"></div>' +
          '<div class="lf-field"><label class="lf-label" for="lfBusinessName"><span data-lt="shop"></span> <span class="lf-req">*</span></label><input id="lfBusinessName" type="text" autocomplete="organization" maxlength="160" data-lp="shopph"><p class="lf-err" id="lfNameErr" role="alert"></p></div>' +
          '<div class="lf-field"><label class="lf-label" for="lfContactName"><span data-lt="contact"></span> <span class="lf-req">*</span></label><input id="lfContactName" type="text" autocomplete="name" maxlength="80" data-lp="contactph"><p class="lf-err" id="lfContactErr" role="alert"></p></div>' +
          '<div class="lf-field"><label class="lf-label" for="lfPhone"><span data-lt="phone"></span> <span class="lf-req">*</span></label><div class="lf-phone"><span class="lf-prefix">' + CFG.flag + ' +' + CFG.dial + '</span><input id="lfPhone" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="16" placeholder="' + CFG.ph + '"></div><p class="lf-err" id="lfPhoneErr" role="alert"></p></div>' +
          '<label class="lf-same" for="lfSame"><input id="lfSame" type="checkbox" checked><span data-lt="sameAsPhone"></span></label>' +
          '<div class="lf-field" id="lfWaField" hidden><label class="lf-label" for="lfWa"><span data-lt="wa"></span> <span class="lf-req">*</span></label><div class="lf-phone"><span class="lf-prefix">' + CFG.flag + ' +' + CFG.dial + '</span><input id="lfWa" type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="16" placeholder="' + CFG.ph + '"></div><p class="lf-err" id="lfWaErr" role="alert"></p></div>' +
          '<fieldset class="lf-field"><legend><span data-lt="type"></span> <span class="lf-req">*</span></legend><div class="lf-choices lf-three">' +
            choice('businessType', 'RETAIL_KIRANA', 'retail') + choice('businessType', 'RESTAURANT_FNB', 'restaurant') + choice('businessType', 'OTHER', 'other') +
          '</div><p class="lf-err" id="lfTypeErr" role="alert"></p></fieldset>' +
          '<div class="lf-field" id="lfOtherField" hidden><input id="lfOtherType" type="text" maxlength="80" data-lp="otherTypeph"></div>' +
          consentBox(1) + actions(1, true) +
        '</section>' +
        /* Step 2 */
        '<section class="lf-step" data-step="2" hidden>' +
          '<div class="lf-back"><button class="lf-text" type="button" data-lf-go="1" data-lt="back"></button></div>' +
          '<p class="lf-eyebrow" data-lt="s2label"></p><h2 data-lh="s2title"></h2><p class="lf-sub" data-lt="s2sub"></p>' +
          '<fieldset class="lf-field"><legend><span data-lt="size"></span> <span class="lf-req">*</span></legend><div class="lf-stack">' +
            card('SMALL', 'smallTitle', 'smallSub') + card('GROWING', 'growingTitle', 'growingSub') + card('ENTERPRISE', 'enterpriseTitle', 'enterpriseSub') +
          '</div><p class="lf-err" id="lfSizeErr" role="alert"></p></fieldset>' +
          '<fieldset class="lf-field"><legend><span data-lt="online"></span> <span class="lf-req">*</span></legend><div class="lf-choices lf-two">' +
            choice('onlineSales', 'SHOP_ONLY', 'onlineNo') + choice('onlineSales', 'YES_ONLINE', 'onlineYes') +
          '</div><p class="lf-err" id="lfOnlineErr" role="alert"></p></fieldset>' +
          consentBox(2) + actions(2, true) +
        '</section>' +
        /* Step 3 */
        '<section class="lf-step" data-step="3" hidden>' +
          '<div class="lf-back"><button class="lf-text" type="button" data-lf-go="2" data-lt="back"></button></div>' +
          '<p class="lf-eyebrow" data-lt="s3label"></p><h2 data-lh="s3title"></h2><p class="lf-sub" data-lt="s3sub"></p>' +
          '<fieldset class="lf-field"><div class="lf-prio-head"><legend><span data-lt="priorities"></span> <span class="lf-req">*</span></legend><span id="lfCount" class="lf-counter" aria-live="polite">0 / 3</span></div><div class="lf-choices lf-two">' +
            choice('needs', 'BILLING_STOCK', 'billing', 'checkbox', ' lf-long') + choice('needs', 'ACCEPT_UPI_CARDS', 'payments', 'checkbox', ' lf-long') +
            choice('needs', 'MANAGE_BRANCHES', 'branches', 'checkbox', ' lf-long') + choice('needs', 'VAT_BILLING', 'vat', 'checkbox', ' lf-long') +
            choice('needs', 'STAFF_PAYROLL', 'payroll', 'checkbox', ' lf-long') + choice('needs', 'REPEAT_CUSTOMERS', 'repeat', 'checkbox', ' lf-long') +
          '</div><p class="lf-err" id="lfNeedsErr" role="alert"></p></fieldset>' +
          '<div class="lf-field"><label class="lf-label" for="lfDesc"><span data-lt="notes"></span> <span class="lf-counter" data-lt="optional"></span></label><textarea id="lfDesc" maxlength="500" data-lp="notesph"></textarea></div>' +
          consentBox(3) + actions(3, false) +
        '</section>' +
        '<section class="lf-complete" id="lfComplete" hidden aria-live="polite"><div class="lf-mark">✓</div><h2 data-lt="completeTitle"></h2><p data-lt="completeCopy"></p></section>' +
      '</form>' +
    '</section></div>';
  document.body.appendChild(wrap.firstChild);

  var modal = document.getElementById('lead-modal');
  var sheet = modal.querySelector('.lf-sheet');
  var form = document.getElementById('lfForm');
  var steps = [].slice.call(modal.querySelectorAll('.lf-step'));
  var bars = [].slice.call(modal.querySelectorAll('.lf-progress i'));
  var consentIds = ['lfConsent1', 'lfConsent2', 'lfConsent3'];
  var $ = function (id) { return document.getElementById(id); };
  var lang = 'en', currentStep = 1, sent = false, lastFocus = null;
  var flowId = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'flow-' + Date.now() + '-' + Math.random().toString(36).slice(2);
  function t(k) { return (L[lang] && L[lang][k]) || L.en[k]; }

  /* Attribution from URL params (kept for the session) */
  function attribution() {
    var p = new URLSearchParams(location.search);
    var a = { campaignId: p.get('campaign_id') || p.get('campaignId') || '', channel: p.get('channel') || '', utmSource: p.get('utm_source') || '', utmMedium: p.get('utm_medium') || '', utmCampaign: p.get('utm_campaign') || '', utmContent: p.get('utm_content') || '', utmTerm: p.get('utm_term') || '', referralName: p.get('referral_name') || '', referralPhone: p.get('referral_phone') || '', referralSource: p.get('referral_source') || '' };
    if (a.channel.toUpperCase() === 'MANUAL') a.channel = '';
    var any = Object.keys(a).some(function (k) { return a[k]; });
    if (any) { try { sessionStorage.setItem(ATTR, JSON.stringify(a)); } catch (e) { /* storage blocked */ } return a; }
    try { return JSON.parse(sessionStorage.getItem(ATTR) || '{}'); } catch (e) { return a; }
  }
  var attr = attribution();

  function paint() {
    lang = (window.YC_lang && window.YC_lang()) || 'en';
    sheet.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    modal.querySelectorAll('[data-lt]').forEach(function (e) { e.textContent = t(e.getAttribute('data-lt')); });
    modal.querySelectorAll('[data-lh]').forEach(function (e) { e.innerHTML = t(e.getAttribute('data-lh')); });
    modal.querySelectorAll('[data-lp]').forEach(function (e) { e.placeholder = t(e.getAttribute('data-lp')); });
    modal.querySelectorAll('.lf-lang').forEach(function (b) {
      var on = b.getAttribute('data-lfl') === lang;
      b.classList.toggle('active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    modal.querySelector('.lf-x').setAttribute('aria-label', t('close'));
    meta();
  }
  function meta() { $('lfStepMeta').textContent = t('stepOf').replace('{n}', currentStep); }

  function digits(v) { return String(v || '').replace(/\D/g, ''); }
  function pick(n) { var x = form.querySelector('input[name="' + n + '"]:checked'); return x ? x.value : ''; }
  function clear() { [].slice.call(arguments).forEach(function (id) { $(id).textContent = ''; }); }
  function error(id, m) { $(id).textContent = m; }
  function hasConsent() { return $('lfConsent1').checked; }
  function refresh() {
    modal.querySelectorAll('.lf-choice').forEach(function (x) { x.classList.toggle('selected', x.querySelector('input').checked); });
    $('lfCount').textContent = form.querySelectorAll('input[name="needs"]:checked').length + ' / ' + MAX;
    $('lfOtherField').hidden = pick('businessType') !== 'OTHER';
  }

  function go(n) {
    currentStep = n;
    steps.forEach(function (s) { s.hidden = Number(s.getAttribute('data-step')) !== n; });
    bars.forEach(function (b, i) { b.classList.toggle('done', i + 1 < n); b.classList.toggle('now', i + 1 === n); });
    meta();
    var h = modal.querySelector('[data-step="' + n + '"] h2');
    if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
    sheet.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function checkOne(needConsent) {
    clear('lfNameErr', 'lfContactErr', 'lfPhoneErr', 'lfWaErr', 'lfTypeErr', 'lfConsent1Err', 'lfConsent2Err', 'lfConsent3Err');
    var good = true, focus = null;
    if (!$('lfBusinessName').value.trim()) { error('lfNameErr', t('nameErr')); good = false; focus = $('lfBusinessName'); }
    if (!$('lfContactName').value.trim()) { error('lfContactErr', t('contactErr')); good = false; focus = focus || $('lfContactName'); }
    if (!/^\d{8,9}$/.test($('lfPhone').value)) { error('lfPhoneErr', t('phoneErr')); good = false; focus = focus || $('lfPhone'); }
    if (!$('lfSame').checked && !/^\d{8,9}$/.test($('lfWa').value)) { error('lfWaErr', t('whatsappErr')); good = false; focus = focus || $('lfWa'); }
    if (!pick('businessType')) { error('lfTypeErr', t('typeErr')); good = false; focus = focus || form.querySelector('input[name="businessType"]'); }
    if (needConsent && !hasConsent()) {
      var errId = 'lfConsent' + currentStep + 'Err';
      error(errId, t('consentErr')); good = false; focus = focus || $(errId.replace('Err', ''));
    }
    if (focus) { if (currentStep !== 1 && focus.closest('[data-step="1"]')) go(1); focus.focus(); }
    return good;
  }

  function checkTwo() {
    clear('lfSizeErr', 'lfOnlineErr', 'lfConsent2Err');
    var good = true, focus = null;
    if (!pick('businessSize')) { error('lfSizeErr', t('sizeErr')); good = false; focus = form.querySelector('input[name="businessSize"]'); }
    if (!pick('onlineSales')) { error('lfOnlineErr', t('onlineErr')); good = false; focus = focus || form.querySelector('input[name="onlineSales"]'); }
    if (!hasConsent()) { error('lfConsent2Err', t('consentErr')); good = false; focus = focus || $('lfConsent2'); }
    if (focus) focus.focus();
    return good;
  }
  function checkThree() {
    clear('lfNeedsErr', 'lfConsent3Err');
    var good = true, focus = null;
    if (!form.querySelectorAll('input[name="needs"]:checked').length) { error('lfNeedsErr', t('needsErr')); good = false; focus = form.querySelector('input[name="needs"]'); }
    if (!hasConsent()) { error('lfConsent3Err', t('consentErr')); good = false; focus = focus || $('lfConsent3'); }
    if (focus) focus.focus();
    return good;
  }

  function intl(v) { var n = digits(v).replace(/^0+/, ''); return n ? '+' + CFG.dial + n : ''; }
  function phoneNumber() { return intl($('lfPhone').value); }
  function whatsappNumber() { return $('lfSame').checked ? phoneNumber() : intl($('lfWa').value); }
  function payload(stage) {
    var first = stage === 'STEP_1';
    var type = pick('businessType');
    var desc = first ? '' : $('lfDesc').value.trim();
    var other = type === 'OTHER' ? $('lfOtherType').value.trim() : '';
    if (other) desc = ('Business type: ' + other + (desc ? '\n' + desc : ''));
    return {
      submittedAt: new Date().toISOString(), businessName: $('lfBusinessName').value.trim(), contactName: $('lfContactName').value.trim(),
      phone: phoneNumber(), whatsappNumber: whatsappNumber(), email: '', region: '', businessType: type,
      businessSize: first ? '' : pick('businessSize'), outlets: '',
      needs: first ? [] : [].slice.call(form.querySelectorAll('input[name="needs"]:checked')).map(function (x) { return x.value; }),
      onlineSales: first ? '' : pick('onlineSales'), description: desc, consent: true, brand: BRAND, market: MARKET, language: lang,
      campaignId: attr.campaignId || '', channel: attr.channel || '', website: $('lfWebsite').value || '',
      utmSource: attr.utmSource || '', utmMedium: attr.utmMedium || '', utmCampaign: attr.utmCampaign || '', utmContent: attr.utmContent || '', utmTerm: attr.utmTerm || '',
      landingPage: location.href, referralName: attr.referralName || '', referralPhone: attr.referralPhone || '', referralSource: attr.referralSource || '',
      submissionStage: stage, flowId: flowId
    };
  }

  function post(url, body) {
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || j.success === false || j.success === 'false') throw Error(j.detail || j.message || ('HTTP ' + r.status)); return true; }); })
      .catch(function (e) { if (window.console) console.warn('[demo form] ' + url + ' — ' + (e && e.message)); return false; });
  }
  function labelOf(name) {
    var x = form.querySelector('input[name="' + name + '"]:checked');
    return x ? (x.parentNode.querySelector('strong') || x.parentNode.querySelector('span')).textContent : '';
  }
  function emailBody(d) {
    var quick = d.submissionStage === 'STEP_1';
    var needs = [].slice.call(form.querySelectorAll('input[name="needs"]:checked')).map(function (x) { return x.parentNode.textContent.replace('✓', '').trim(); });
    return {
      _subject: (quick ? 'New demo request (quick booking) — ' : 'New demo request — ') + d.businessName,
      _cc: NOTIFY.cc,
      _template: 'table',
      _captcha: 'false',
      _honey: d.website,
      'Shop name': d.businessName,
      'Contact name': d.contactName,
      'Phone': d.phone,
      'WhatsApp': d.whatsappNumber,
      'Business type': labelOf('businessType') + (d.businessType === 'OTHER' && $('lfOtherType').value.trim() ? ' — ' + $('lfOtherType').value.trim() : ''),
      'Business size': (!quick && labelOf('businessSize')) || '—',
      'Sells online': (!quick && labelOf('onlineSales')) || '—',
      'Priorities': (!quick && needs.join(', ')) || '—',
      'Notes': (!quick && $('lfDesc').value.trim()) || '—',
      'Language': d.language === 'ar' ? 'Arabic' : 'English',
      'Page': d.landingPage,
      'UTM source / medium / campaign': [d.utmSource, d.utmMedium, d.utmCampaign].filter(Boolean).join(' / ') || '—',
      'Submitted at': d.submittedAt
    };
  }
  function mailFallback(d) {
    var e = emailBody(d), lines = [];
    Object.keys(e).forEach(function (k) { if (k.charAt(0) !== '_') lines.push(k + ': ' + e[k]); });
    return 'mailto:' + NOTIFY.to + '?cc=' + encodeURIComponent(NOTIFY.cc) + '&subject=' + encodeURIComponent(e._subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  }
  function send(button, statusId, stage) {
    var label = button.textContent, status = $(statusId);
    button.disabled = true; button.textContent = t('sending');
    status.className = 'lf-status'; status.textContent = '';
    var d = payload(stage || 'COMPLETE');
    if (d.website) { // honeypot filled: pretend success, send nothing
      button.disabled = false; button.textContent = label; return Promise.resolve(true);
    }
    return Promise.all([
      post(API, d),
      post('https://formsubmit.co/ajax/' + NOTIFY.to, emailBody(d))
    ]).then(function (res) {
      var ok = res[0] || res[1];
      if (ok && WA_CONFIRM_URL) {
        // Fire-and-forget: confirmation to the customer's WhatsApp.
        post(WA_CONFIRM_URL, { to: d.whatsappNumber, name: d.contactName, business: d.businessName, language: d.language });
      }
      if (!ok) {
        status.className = 'lf-status error';
        status.innerHTML = '';
        status.appendChild(document.createTextNode(t('fail') + ' '));
        var a = document.createElement('a');
        a.href = mailFallback(d); a.textContent = t('failMail');
        status.appendChild(a);
      }
      button.disabled = false; button.textContent = label;
      return ok;
    });
  }

  function showComplete() {
    steps.forEach(function (s) { s.hidden = true; });
    $('lfComplete').hidden = false; $('lfProgressWrap').hidden = true;
    bars.forEach(function (b) { b.classList.remove('now'); b.classList.add('done'); });
    sheet.scrollTo({ top: 0 });
  }

  /* Events */
  // UAE local number: digits only, no leading 0 (the +971 prefix replaces it), at most 9 digits.
  function uaeLocal(v) { return digits(v).replace(/^(?:971|00971)/, '').replace(/^0+/, '').slice(0, 9); }
  $('lfPhone').addEventListener('input', function (e) { e.target.value = uaeLocal(e.target.value); clear('lfPhoneErr'); });
  $('lfWa').addEventListener('input', function (e) { e.target.value = uaeLocal(e.target.value); clear('lfWaErr'); });
  $('lfSame').addEventListener('change', function (e) { $('lfWaField').hidden = e.target.checked; clear('lfWaErr'); if (!e.target.checked) $('lfWa').focus(); });
  form.addEventListener('change', function (e) {
    if (e.target.matches('input[type=radio],input[type=checkbox]')) refresh();
    if (e.target.name === 'needs') {
      if (form.querySelectorAll('input[name="needs"]:checked').length > MAX) { e.target.checked = false; refresh(); error('lfNeedsErr', t('maxErr')); }
      else clear('lfNeedsErr');
    }
    if (consentIds.indexOf(e.target.id) !== -1) {
      consentIds.forEach(function (id) { if (id !== e.target.id) $(id).checked = e.target.checked; });
      clear('lfConsent1Err', 'lfConsent2Err', 'lfConsent3Err');
    }
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  modal.querySelectorAll('[data-lf-go]').forEach(function (b) { b.addEventListener('click', function () { go(Number(b.getAttribute('data-lf-go'))); }); });
  $('lfContinue1').addEventListener('click', function () { if (checkOne(true)) go(2); });
  $('lfBookNow').addEventListener('click', function () {
    if (sent || !checkOne(true)) return;
    send($('lfBookNow'), 'lfStatus1', 'STEP_1').then(function (ok) { if (ok) { sent = true; showComplete(); } });
  });
  $('lfContinue2').addEventListener('click', function () { if (checkTwo()) go(3); });
  $('lfSubmit').addEventListener('click', function () {
    if (sent || !checkOne(true) || !checkTwo() || !checkThree()) return;
    send($('lfSubmit'), 'lfStatus3', 'COMPLETE').then(function (ok) { if (ok) { sent = true; showComplete(); } });
  });
  modal.querySelectorAll('.lf-lang').forEach(function (b) {
    b.addEventListener('click', function () { if (window.YC_applyLang) window.YC_applyLang(b.getAttribute('data-lfl'), true); else paint(); });
  });
  document.addEventListener('yc:lang', paint);

  /* Open / close */
  function open(device) {
    lastFocus = document.activeElement;
    var dv = DEVICES[device] || DEVICES.y4000, img = $('lfDevice');
    if (img.getAttribute('src') !== dv[0]) { img.src = dv[0]; img.alt = dv[1]; }
    if (sent) { /* allow a fresh request after a completed one */
      sent = false; form.reset(); $('lfComplete').hidden = true; $('lfProgressWrap').hidden = false; $('lfWaField').hidden = true;
      flowId = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'flow-' + Date.now();
      consentIds.forEach(function (id) { $(id).checked = true; });
      refresh(); go(1);
    }
    paint();
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { var i = $('lfBusinessName'); if (i && currentStep === 1 && window.matchMedia('(min-width: 681px)').matches) i.focus(); }, 350);
  }
  function close() {
    modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  modal.addEventListener('click', function (e) { if (e.target.closest('[data-lf-close]')) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
  window.YC_openDemo = open;

  paint(); go(1); refresh();
})();
