# Book-a-demo notifications

When a customer submits the Book-a-demo form, `js/demo-form.js` does three things:

1. Sends the lead to Pulse (`https://pulse.youcloudtech.com/api/public/lead-capture`).
2. Emails the inquiry to **sales@youcloud.ae**, CC **arun@youcloudpay.com**, through FormSubmit.
3. Calls `/api/whatsapp-confirm`, which sends the customer a WhatsApp confirmation.

The customer sees the success message if step 1 or step 2 worked.

## Email (FormSubmit)

Nothing to deploy. The very first submission makes FormSubmit send an **activation email** to
sales@youcloud.ae. Click the link in it once. Emails are not delivered until then.
Addresses are set in `NOTIFY` at the top of `js/demo-form.js`.

## WhatsApp confirmation

`whatsapp-confirm.js` is a serverless function for Vercel. It only works once the site is hosted on
Vercel (or a host that runs `/api` functions) and these are set up.

1. In WhatsApp Manager, create and get approval for a **utility** template named `inquiry_received`
   with one variable, in English and Arabic:
   - EN: `Hi {{1}}, thank you for contacting youcloud. We've received your inquiry and our UAE team will reach out to you soon.`
   - AR: `مرحباً {{1}}، شكراً لتواصلك مع youcloud. لقد استلمنا طلبك وسيتواصل معك فريقنا في الإمارات قريباً.`
2. Set environment variables on the host:
   `WA_TOKEN`, `WA_PHONE_NUMBER_ID`, `WA_TEMPLATE=inquiry_received`, `ALLOWED_ORIGIN=https://<your-domain>`.
3. Deploy. The form already calls `/api/whatsapp-confirm`. Change `WA_CONFIRM_URL` in `js/demo-form.js`
   if the function lives elsewhere.

If Pulse already sends WhatsApp messages for new leads, you can skip this and set `WA_CONFIRM_URL` to `''`.
