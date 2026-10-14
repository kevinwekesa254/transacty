/* youcloud assistant — answers questions from the website content, in English or Arabic.
   Runs fully in the browser: a bilingual knowledge base + keyword scoring. */
(function () {
  'use strict';

  var cfg = window.YC_CONFIG || {};
  var wa = function (t) { return window.YC_waHref ? window.YC_waHref(t) : 'mailto:support@youcloud.ae'; };
  function L(href, text) { return '<a href="' + href + '">' + text + '</a>'; }
  var DEMO_EN = '<a href="#" data-chat-demo>Book a free 15-min demo</a>';
  var DEMO_AR = '<a href="#" data-chat-demo>احجز عرضاً مجانياً لمدة 15 دقيقة</a>';

  /* ---------- Knowledge base ---------- */
  var KB = [
    { id: 'hello',
      k: ['hi', 'hello', 'hey', 'salam', 'good morning', 'good evening', 'مرحبا', 'السلام عليكم', 'اهلا', 'هلا', 'صباح الخير', 'مساء الخير'],
      en: 'Hello! 👋 I can answer anything about youcloud — pricing, hardware, payments, setup, solutions or enterprise. What would you like to know?',
      ar: 'أهلاً بك! 👋 يمكنني الإجابة عن أي سؤال حول youcloud — الأسعار، الأجهزة، المدفوعات، الإعداد، الحلول أو باقة المؤسسات. بماذا أساعدك؟' },
    { id: 'thanks',
      k: ['thank', 'thanks', 'thx', 'great', 'perfect', 'شكرا', 'شكراً', 'مشكور', 'ممتاز', 'يعطيك العافية'],
      en: 'You\'re welcome! Anything else I can help with? You can also ' + DEMO_EN.replace('Book', 'book') + '.',
      ar: 'على الرحب والسعة! هل هناك أي شيء آخر؟ يمكنك أيضاً ' + DEMO_AR + '.' },
    { id: 'what',
      k: ['what is youcloud', 'what do you do', 'what is this', 'about youcloud', 'one app', 'eight products', 'all in one', 'modules', 'ما هو youcloud', 'ماذا تقدمون', 'تطبيق واحد', 'ما هو التطبيق', 'عن الشركة', 'وحدات'],
      en: '<b>youcloud</b> is one app for UAE merchants: billing/POS, stock, payments, QR ordering, loyalty, promotions, AI insights and back office (HR, payroll, accounts). One login, one shared data, one monthly bill — and you can be live in under an hour.',
      ar: '<b>youcloud</b> تطبيق واحد لتجار الإمارات: الفوترة ونقاط البيع، المخزون، المدفوعات، الطلب عبر QR، الولاء، العروض، رؤى الذكاء الاصطناعي والمكتب الخلفي (الموارد البشرية، الرواتب، الحسابات). تسجيل دخول واحد، بيانات مشتركة واحدة، فاتورة شهرية واحدة — وجاهز خلال أقل من ساعة.' },
    { id: 'pricing',
      k: ['price', 'pricing', 'cost', 'plan', 'plans', 'tier', 'subscription', 'standard', 'power', 'per month', 'monthly', 'cheap', 'expensive', 'aed', 'retail plan', 'restaurant plan', 'سعر', 'اسعار', 'الأسعار', 'كم التكلفة', 'باقة', 'باقات', 'اشتراك', 'شهري', 'تكلفة', 'درهم'],
      en: 'Packages are per store, per month (billed annually, excl. 5% VAT):<ul><li><b>Retail</b> — Standard <span class="dh" role="img" aria-label="AED"></span>19 (1 till) · Power <span class="dh" role="img" aria-label="AED"></span>49 (3 tills, most popular) · Enterprise custom</li><li><b>F&amp;B / Restaurant</b> — Standard <span class="dh" role="img" aria-label="AED"></span>39 (1 till) · Power <span class="dh" role="img" aria-label="AED"></span>99 (2 tills, most popular) · Enterprise custom</li><li><b>Self-service</b> — Standard <span class="dh" role="img" aria-label="AED"></span>0 + <span class="dh" role="img" aria-label="AED"></span>1 per order · Power <span class="dh" role="img" aria-label="AED"></span>99 unlimited orders (1 till each) · Enterprise custom</li></ul>Tills are counted per store. Card MDR 2–3% is extra. ' + L('index.html#pricing', 'See pricing →') + '',
      ar: 'الباقات لكل متجر شهرياً (تُدفع سنوياً، لا تشمل ضريبة القيمة المضافة 5%):<ul><li><b>التجزئة</b> — القياسية <span class="dh" role="img" aria-label="AED"></span>19 (نقطة بيع واحدة) · المتقدمة <span class="dh" role="img" aria-label="AED"></span>49 (3 نقاط بيع، الأكثر طلباً) · المؤسسات بسعر مخصّص</li><li><b>المطاعم والمقاهي</b> — القياسية <span class="dh" role="img" aria-label="AED"></span>39 (نقطة بيع واحدة) · المتقدمة <span class="dh" role="img" aria-label="AED"></span>99 (نقطتا بيع، الأكثر طلباً) · المؤسسات بسعر مخصّص</li><li><b>الخدمة الذاتية</b> — القياسية <span class="dh" role="img" aria-label="AED"></span>0 + <span class="dh" role="img" aria-label="AED"></span>1 لكل طلب · المتقدمة <span class="dh" role="img" aria-label="AED"></span>99 بطلبات بلا حدود (نقطة بيع واحدة لكل منهما) · المؤسسات بسعر مخصّص</li></ul>تُحتسب نقاط البيع لكل متجر. رسوم خصم البطاقات 2–3% إضافية. ' + L('index.html#pricing', 'عرض الأسعار ←') + '' },
    { id: 'addons',
      k: ['add-on', 'addon', 'add on', 'ai insights', 'ai lens', 'ai workflows', 'optional', 'extra', 'إضافات', 'اضافة', 'إضافة', 'اختياري'],
      en: 'Optional add-ons, all on the same merchant data:<ul><li>youMarketing (WABA) — <span class="dh" role="img" aria-label="AED"></span>30/mo + per message</li><li>youInsight — <span class="dh" role="img" aria-label="AED"></span>25/mo per store</li><li>youLens — <span class="dh" role="img" aria-label="AED"></span>65/mo + <span class="dh" role="img" aria-label="AED"></span>25 per camera</li><li>youWorkflows — <span class="dh" role="img" aria-label="AED"></span>50/mo</li><li>youAccounts — <span class="dh" role="img" aria-label="AED"></span>30/mo, included in Power</li><li>youHR — <span class="dh" role="img" aria-label="AED"></span>15 per staff, included in Power</li><li>WebShop &amp; Social — <span class="dh" role="img" aria-label="AED"></span>15/mo, included in Power</li><li>youLend — revenue share, no monthly fee</li></ul>' + L('index.html#addons', 'See add-ons →') + '',
      ar: 'إضافات اختيارية تعمل جميعها على بيانات التاجر نفسها:<ul><li>youMarketing (WABA) — <span class="dh" role="img" aria-label="AED"></span>30/شهرياً + لكل رسالة</li><li>youInsight — <span class="dh" role="img" aria-label="AED"></span>25/شهرياً لكل متجر</li><li>youLens — <span class="dh" role="img" aria-label="AED"></span>65/شهرياً + <span class="dh" role="img" aria-label="AED"></span>25 لكل كاميرا</li><li>youWorkflows — <span class="dh" role="img" aria-label="AED"></span>50/شهرياً</li><li>youAccounts — <span class="dh" role="img" aria-label="AED"></span>30/شهرياً، مشمول في المتقدمة</li><li>youHR — <span class="dh" role="img" aria-label="AED"></span>15 لكل موظف، مشمول في المتقدمة</li><li>المتجر الإلكتروني والبيع الاجتماعي — <span class="dh" role="img" aria-label="AED"></span>15/شهرياً، مشمول في المتقدمة</li><li>youLend — مشاركة في الإيرادات، بلا رسوم شهرية</li></ul>' + L('index.html#addons', 'عرض الإضافات ←') + '' },
    { id: 'fees',
      k: ['fee', 'fees', 'mdr', 'commission', 'rate', 'rates', 'percentage', 'visa', 'mastercard', 'amex', 'transaction fee', 'رسوم', 'نسبة', 'عمولة الدفع', 'فيزا', 'ماستركارد', 'امريكان اكسبريس'],
      en: 'Payment rates per transaction: card MDR (Visa / Mastercard / Amex) 2–3%, domestic wallets 0.9–1.5%, QR rails 0.5–1.2%. Charged on top of software; a card terminal is required. Volume discounts on Enterprise.',
      ar: 'رسوم المدفوعات لكل معاملة: رسوم خصم البطاقات (فيزا / ماستركارد / أمريكان إكسبريس) 2–3%، المحافظ المحلية 0.9–1.5%، شبكات QR من 0.5 إلى 1.2%. تُحتسب فوق رسوم البرمجيات ويلزم جهاز بطاقات. خصومات حسب الحجم في باقة المؤسسات.' },
    { id: 'hardware', boost: 2,
      k: ['hardware cost', 'hardware price', 'price of hardware', 'device price', 'how much is the', 'سعر الاجهزه', 'اسعار الاجهزه', 'تكلفه الاجهزه', 'سعر الجهاز', 'hardware', 'device', 'devices', 'terminal', 'machine', 'kit', 'printer', 'y1000', 'y4000', 'y5000', 'y7000', 'y10', 'handheld', 'tablet', 'kiosk', 'soundbox', 'counter', 'أجهزة', 'اجهزة', 'جهاز', 'طابعة', 'كشك', 'جهاز لوحي', 'محمول', 'ساوند بوكس'],
      en: 'Hardware is a one-time purchase (excl. VAT):<ul><li><b>y1000</b> handheld POS — <span class="dh" role="img" aria-label="AED"></span>699</li><li><b>y4000</b> tablet POS on stand — <span class="dh" role="img" aria-label="AED"></span>1,199</li><li><b>y5000</b> counter POS — <span class="dh" role="img" aria-label="AED"></span>1,499 (most popular)</li><li><b>y7000</b> self-service kiosk — <span class="dh" role="img" aria-label="AED"></span>2,999</li><li><b>y10</b> QR SoundBox — <span class="dh" role="img" aria-label="AED"></span>149</li></ul>Kits arrive charged and pre-activated, with next-day UAE delivery. ' + L('index.html#hardware', 'See hardware →'),
      ar: 'تُشترى الأجهزة بدفعة واحدة (لا تشمل ضريبة القيمة المضافة):<ul><li><b>y1000</b> جهاز محمول — <span class="dh" role="img" aria-label="AED"></span>699</li><li><b>y4000</b> جهاز لوحي مع حامل — <span class="dh" role="img" aria-label="AED"></span>1,199</li><li><b>y5000</b> جهاز كاونتر بشاشتين — <span class="dh" role="img" aria-label="AED"></span>1,499 (الأكثر طلباً)</li><li><b>y7000</b> كشك خدمة ذاتية — <span class="dh" role="img" aria-label="AED"></span>2,999</li><li><b>y10</b> QR SoundBox — <span class="dh" role="img" aria-label="AED"></span>149</li></ul>تصل الأطقم مشحونة ومفعّلة مسبقاً، مع توصيل في اليوم التالي داخل الإمارات. ' + L('index.html#hardware', 'عرض الأجهزة ←') },
    { id: 'delivery',
      k: ['delivery', 'ship', 'shipping', 'deliver', 'arrive', 'when will', 'next day', 'توصيل', 'شحن', 'متى يصل', 'اليوم التالي'],
      en: 'Hardware ships <b>next-day across the UAE</b>, pre-activated — just log in. Devices are PCI PTS 5.x SRED, EMV L1 + L2 and OTA fleet-managed.',
      ar: 'تُشحن الأجهزة <b>في اليوم التالي إلى جميع أنحاء الإمارات</b> مفعّلة مسبقاً — فقط سجّل الدخول. الأجهزة معتمدة وفق PCI PTS 5.x SRED وEMV L1 + L2 وتُدار وتُحدَّث عن بُعد.' },
    { id: 'setup',
      k: ['setup', 'set up', 'install', 'onboarding', 'go live', 'how long', 'how fast', 'quick', 'start', 'get started', '60 minutes', 'import', 'إعداد', 'اعداد', 'تركيب', 'كم يستغرق', 'متى ابدأ', 'البدء', 'تشغيل', '60 دقيقة', 'استيراد'],
      en: 'You can be <b>live in 60 minutes</b>:<ul><li>Min 0–5 — unbox, plug in, connect Wi-Fi</li><li>Min 5–20 — log in & import (snap your menu or price list, AI OCR keys it in, or upload a CSV)</li><li>Min 20–45 — add staff logins and run an <span class="dh" role="img" aria-label="AED"></span>1 test sale</li><li>Min 45–60 — ring your first sale</li></ul>Average across 200+ UAE pilot merchants. ' + L('index.html#live', 'See the steps →'),
      ar: 'يمكنك البدء <b>خلال 60 دقيقة</b>:<ul><li>الدقيقة 0–5 — افتح العلبة، صِله بالكهرباء والإنترنت</li><li>الدقيقة 5–20 — سجّل الدخول واستورد (صوّر القائمة أو الأسعار وتُدخلها تقنية OCR، أو ارفع ملف CSV)</li><li>الدقيقة 20–45 — أضف حسابات الموظفين ونفّذ بيعاً تجريبياً بقيمة <span class="dh" role="img" aria-label="AED"></span>1</li><li>الدقيقة 45–60 — سجّل أول عملية بيع</li></ul>هذا هو المتوسط لدى أكثر من 200 تاجر تجريبي في الإمارات. ' + L('index.html#live', 'عرض الخطوات ←') },
    { id: 'settlement',
      k: ['settle', 'settlement', 't+2', 't+0', 'rakbank', 'dib', 'same day', 'same-day', 'bank', 'banks', 'iban', 'payout', 'emirates nbd', 'fab', 'adcb', 'mashreq', 'get paid', 'money', 'تسوية', 'بنك', 'بنوك', 'ايبان', 'آيبان', 'الإمارات دبي الوطني', 'أبوظبي الأول', 'أبوظبي التجاري', 'المشرق', 'نفس اليوم', 'استلام المال'],
      en: '<b>T+2 settlement</b> to any UAE IBAN — Emirates NBD, FAB, ADCB, Mashreq, RAKBANK, DIB and more — with no change to your operating account. Because youcloud acquires the card and rings the sale, both post to the same ledger: the number in the dashboard is the number in the bank.',
      ar: '<b>تسوية T+2</b> إلى أي حساب IBAN في الإمارات — بنك الإمارات دبي الوطني وبنك أبوظبي الأول وبنك أبوظبي التجاري وبنك المشرق وبنك رأس الخيمة الوطني وبنك دبي الإسلامي وغيرها — دون تغيير حسابك التشغيلي. ولأن youcloud تتولى استحواذ البطاقة وتسجيل البيع معاً، يُرحَّل الحدثان إلى السجل نفسه: الرقم في لوحة التحكم هو الرقم في البنك.' },
    { id: 'license',
      k: ['license', 'licence', 'licensed', 'central bank', 'cb uae', 'cbuae', 'regulated', 'legal', 'ترخيص', 'مرخص', 'المصرف المركزي', 'البنك المركزي', 'رخصة', 'قانوني'],
      en: 'Card acquiring is operated under a <b>Central Bank of the UAE licensed acquiring partner</b>. The gateway is PCI DSS Level 1 and terminals are PCI PTS 5.x with SRED.',
      ar: 'تتم عمليات استحواذ البطاقات عبر <b>شريك استحواذ مرخّص من مصرف الإمارات العربية المتحدة المركزي</b>. البوابة معتمدة PCI DSS المستوى الأول، والأجهزة معتمدة وفق PCI PTS 5.x مع SRED.' },
    { id: 'vat',
      k: ['vat', 'fta', 'tax', 'e-invoice', 'einvoice', 'e invoicing', 'invoice', 'invoicing', 'ضريبة', 'القيمة المضافة', 'الهيئة الاتحادية للضرائب', 'فوترة إلكترونية', 'فاتورة إلكترونية', 'فواتير'],
      en: 'Yes — <b>FTA e-invoicing and VAT ready</b>. Every sale is VAT-coded at the point of sale and auto-posts to your books. E-invoicing is built in, not bolted on, and VAT can be filed per entity.',
      ar: 'نعم — <b>جاهز للفوترة الإلكترونية وضريبة القيمة المضافة وفق الهيئة الاتحادية للضرائب</b>. كل عملية بيع تُرمَّز بالضريبة عند نقطة البيع وتُرحَّل تلقائياً إلى دفاترك، والفوترة الإلكترونية مدمجة وليست إضافة لاحقة، ويمكن تقديم الإقرار لكل كيان.' },
    { id: 'language',
      k: ['language', 'languages', 'arabic', 'english', 'hindi', 'tagalog', 'urdu', 'tamil', 'telugu', 'malayalam', 'bengali', 'sinhala', 'french', 'wolof', 'translate', 'لغة', 'لغات', 'العربية', 'عربي', 'انجليزي', 'الإنجليزية', 'هندي', 'تاغالوغ'],
      en: 'The app works in <b>English and Arabic</b> — each user can switch at any time — and so do receipts, WhatsApp messages and our support team. This website switches too: use the EN / العربية toggle at the top.',
      ar: 'يعمل التطبيق <b>بالإنجليزية والعربية</b> — ويمكن لكل مستخدم التبديل في أي وقت — وكذلك الإيصالات ورسائل واتساب وفريق الدعم. ويمكنك أيضاً تبديل لغة هذا الموقع من زر EN / العربية في الأعلى.' },
    { id: 'aggregators',
      k: ['talabat', 'careem', 'deliveroo', 'noon', 'noon food', 'aggregator', 'aggregators', 'delivery app', 'online orders', 'طلبات', 'كريم', 'ديليفرو', 'منصات التوصيل', 'تطبيقات التوصيل'],
      en: 'Keep them — they\'re pre-integrated. Talabat, Careem, Deliveroo and Noon Food orders land in <b>one KDS</b> beside dine-in: one kitchen view, one settlement, no tablet farm. 86 an item everywhere at once. A direct branded app saves 25–30% on repeat orders.',
      ar: 'احتفظ بها — فهي مدمجة مسبقاً. تصل طلبات طلبات وكريم وديليفرو ونون فود إلى <b>شاشة مطبخ واحدة</b> إلى جانب طلبات الصالة: عرض مطبخ واحد، وتسوية واحدة، ودون جهاز لوحي لكل تطبيق. أوقف الصنف النافد على كل القنوات دفعة واحدة. ويوفّر تطبيق مباشر بعلامتك 25–30% على الطلبات المتكررة.' },
    { id: 'compare',
      k: ['geidea', 'network international', 'network intl', 'competitor', 'compare', 'comparison', 'difference', 'better than', 'vs', 'versus', 'جيديا', 'نتورك', 'منافس', 'مقارنة', 'الفرق', 'أفضل من'],
      en: 'Geidea and Network International do payments well — but POS, HR, books, marketing and AI are still separate vendors. youcloud includes native POS & inventory, restaurant KDS + aggregators, HR & payroll, bookkeeping, WhatsApp marketing and AI, with <b>T+2</b> settlement to the IBAN you already use, <b>60 minutes</b> to go live (vs days) and plans from <b><span class="dh" role="img" aria-label="AED"></span>19</b> per store a month. ' + L('index.html#compare', 'See the comparison →'),
      ar: 'تتقن Geidea وNetwork International المدفوعات — لكن نقاط البيع والموارد البشرية والدفاتر والتسويق والذكاء الاصطناعي تبقى لدى مزوّدين منفصلين. أما youcloud فتشمل نقاط البيع والمخزون، وشاشة المطبخ مع منصات التوصيل، والموارد البشرية والرواتب، ومسك الدفاتر، والتسويق عبر واتساب، والذكاء الاصطناعي، مع تسوية <b>T+2</b> إلى الحساب الذي تستخدمه، وبدء خلال <b>60 دقيقة</b> (مقابل أيام)، وباقات تبدأ من <b><span class="dh" role="img" aria-label="AED"></span>19</b> لكل متجر شهرياً. ' + L('index.html#compare', 'عرض المقارنة ←') },
    { id: 'hr',
      k: ['hr', 'payroll', 'salary', 'salaries', 'wps', 'staff', 'employee', 'employees', 'shift', 'tips', 'commission staff', 'الموارد البشرية', 'رواتب', 'الرواتب', 'موظفين', 'موظف', 'حماية الأجور', 'ورديات', 'إكراميات'],
      en: 'HR & payroll are built in (Power plan, or add-on). Payroll runs on the shift data your POS logged, it\'s <b>WPS-ready</b>, and tips are pooled automatically. Each cashier, waiter or stylist gets their own login.',
      ar: 'الموارد البشرية والرواتب مدمجة (في الباقة المتقدمة أو كإضافة). تُحتسب الرواتب من بيانات الورديات المسجّلة في نقاط البيع، والنظام <b>متوافق مع نظام حماية الأجور (WPS)</b>، وتُجمَّع الإكراميات تلقائياً. ولكل كاشير أو نادل أو مصفف حساب دخول خاص.' },
    { id: 'books',
      k: ['bookkeeping', 'accounting', 'accounts', 'books', 'ledger', 'p&l', 'balance sheet', 'reconciliation', 'recon', 'محاسبة', 'مسك الدفاتر', 'الدفاتر', 'حسابات', 'الأرباح والخسائر', 'ميزانية', 'مطابقة'],
      en: 'Every sale auto-posts to your books, FTA-ready — no import, no double-entry. You get live P&L, balance sheet and VAT, and reconciliation is automatic because payments and sales share one ledger (100% matched). Full books (bank recon, P&amp;L, balance sheet) are included in Power.',
      ar: 'كل عملية بيع تُرحَّل تلقائياً إلى دفاترك وفق متطلبات الهيئة الاتحادية للضرائب — بلا استيراد ولا إدخال مزدوج. تحصل على أرباح وخسائر وميزانية عمومية وضريبة مباشرة، والمطابقة تلقائية لأن المدفوعات والمبيعات تشترك في سجل واحد (مطابقة 100%). والدفاتر الكاملة (المطابقة البنكية، الأرباح والخسائر، الميزانية العمومية) مشمولة في الباقة المتقدمة.' },
    { id: 'marketing',
      k: ['marketing', 'whatsapp marketing', 'waba', 'campaign', 'campaigns', 'promotion', 'promotions', 'sms', 'تسويق', 'حملات', 'حملة', 'عروض ترويجية', 'واتساب للأعمال'],
      en: 'Integrated Marketing runs on <b>WhatsApp Business (WABA)</b>, with campaign segments built from live sales — it already knows your customers. <span class="dh" role="img" aria-label="AED"></span>35/mo + per message as an add-on, included in Power.',
      ar: 'يعمل التسويق المتكامل عبر <b>واتساب للأعمال (WABA)</b>، مع شرائح حملات مبنية من المبيعات الحيّة — فهو يعرف عملاءك مسبقاً. السعر <span class="dh" role="img" aria-label="AED"></span>35/شهرياً + لكل رسالة كإضافة، ومشمول في الباقة المتقدمة.' },
    { id: 'ai',
      k: ['ai', 'artificial intelligence', 'forecast', 'forecasting', 'camera', 'cameras', 'vision', 'automation', 'insights', 'lens', 'ذكاء اصطناعي', 'الذكاء الاصطناعي', 'توقعات', 'كاميرا', 'كاميرات', 'أتمتة', 'رؤى'],
      en: 'youcloud is AI-native: <b>AI Insights</b> (forecasts trained on your own transactions — e.g. tomorrow\'s bake by 6am), <b>AI Lens</b> (store cameras that see what happens on the floor, like kitchen hygiene) and <b>AI Workflows</b> (automations that act on live signals). Observe → Understand → Act.',
      ar: 'youcloud قائمة على الذكاء الاصطناعي: <b>AI Insights</b> (توقعات مدرّبة على معاملاتك — مثل كمية مخبوزات الغد قبل السادسة صباحاً)، و<b>AI Lens</b> (كاميرات المتجر ترى ما يحدث في الصالة، مثل نظافة المطبخ)، و<b>AI Workflows</b> (أتمتة تتصرف بناءً على إشارات حيّة). رصد ← فهم ← تنفيذ.' },
    { id: 'inventory',
      k: ['inventory', 'stock', 'sku', 'skus', 'warehouse', 'expiry', 'batch', 'transfer', 'low stock', 'barcode', 'مخزون', 'المخزون', 'مستودع', 'باركود', 'تاريخ الانتهاء', 'أصناف', 'تحويل'],
      en: 'Stock decrements the instant it sells, on any channel. Snap a supplier invoice and OCR keys it into the ledger. You get low-stock alerts, inter-store transfers, batch & expiry tracking and supplier auto-reorder — all outlets synced live.',
      ar: 'يُخصم المخزون لحظة البيع وعلى أي قناة. صوّر فاتورة المورّد لتُدخلها تقنية OCR في السجل. تحصل على تنبيهات انخفاض المخزون، والتحويل بين الفروع، وتتبّع الدفعات وتواريخ الانتهاء، وإعادة الطلب التلقائي من المورّدين — مع مزامنة لحظية لكل الفروع.' },
    { id: 'loyalty',
      k: ['loyalty', 'points', 'rewards', 'gift card', 'store credit', 'customers', 'crm', 'ولاء', 'نقاط', 'مكافآت', 'بطاقات هدايا', 'عملاء'],
      en: 'Loyalty (points / rewards) and customer segments are in every plan; Power adds gift cards & store credit. Loyalty can run on WhatsApp, and kiosk guests earn loyalty themselves.',
      ar: 'برنامج الولاء (نقاط / مكافآت) وشرائح العملاء متاحة في كل الباقات، وتضيف الباقة المتقدمة بطاقات الهدايا ورصيد المتجر. ويمكن تشغيل الولاء عبر واتساب، ويكسب ضيوف الكشك النقاط بأنفسهم.' },
    { id: 'industries',
      k: ['retail', 'shop', 'grocery', 'restaurant', 'cafe', 'café', 'salon', 'spa', 'clinic', 'pharmacy', 'industry', 'industries', 'business type', 'تجزئة', 'متجر', 'بقالة', 'مطعم', 'مقهى', 'صالون', 'عيادة', 'صيدلية', 'نوع النشاط', 'قطاع'],
      en: 'Same app, different templates:<ul><li><b>Retail</b> — groceries, dates & sweets, textiles, electronics, pharmacies</li><li><b>Restaurants & cafes</b> — table POS, KDS, Talabat & Careem sync, WhatsApp reservations</li><li><b>Salons & services</b> — bookings, chair-side flow, staff commission</li><li><b>Chains & franchises</b> — central menu, one settlement, franchise governance</li></ul>' + L('index.html#industries', 'See industries →'),
      ar: 'التطبيق نفسه بقوالب مختلفة:<ul><li><b>التجزئة</b> — البقالة، التمور والحلويات، الأقمشة، الإلكترونيات، الصيدليات</li><li><b>المطاعم والمقاهي</b> — نقاط بيع للطاولات، KDS، مزامنة طلبات وكريم، حجوزات واتساب</li><li><b>الصالونات والخدمات</b> — الحجوزات، سير العمل عند الكرسي، عمولات الموظفين</li><li><b>السلاسل والامتيازات</b> — قائمة مركزية، تسوية واحدة، حوكمة الامتياز</li></ul>' + L('index.html#industries', 'عرض القطاعات ←') },
    { id: 'solutions',
      k: ['solution', 'solutions', 'use case', 'operating model', 'distribution', 'fleet', 'taxi', 'production', 'manufacturing', 'factory', 'cloud kitchen', 'multi-brand', 'single outlet', 'حلول', 'الحلول', 'توزيع', 'أسطول', 'تاكسي', 'إنتاج', 'تصنيع', 'مصنع', 'مطبخ سحابي', 'متعدد العلامات', 'فرع واحد'],
      en: 'Seven operating models on the same platform:<ul><li>01 Cafe — QR ordering, kiosk, AI bake forecasts</li><li>02 Distribution — route sales on y1000, live credit</li><li>03 Fleet — pay at the seat, driver SVA, advances</li><li>04 Production — BOM to retail till, one ledger</li><li>05 Single-outlet — live in 60 min, loan-ready in 90 days</li><li>06 Multi-brand — central purchasing, per-brand books</li><li>07 Cloud-kitchen — many brands, one unified KDS</li></ul>' + L('solutions.html', 'Explore solutions →'),
      ar: 'سبعة نماذج تشغيلية على المنصة نفسها:<ul><li>01 المقاهي — طلب عبر QR، كشك، توقعات المخبوزات</li><li>02 التوزيع — مبيعات ميدانية بجهاز y1000 وائتمان مباشر</li><li>03 الأساطيل — الدفع من المقعد، حساب SVA للسائق، سُلف</li><li>04 الإنتاج — من قائمة المواد إلى صندوق البيع بسجل واحد</li><li>05 الفرع الواحد — جاهز خلال 60 دقيقة ومؤهَّل للتمويل خلال 90 يوماً</li><li>06 متعدد العلامات — شراء مركزي ودفاتر لكل علامة</li><li>07 المطابخ السحابية — علامات عديدة وشاشة KDS موحّدة</li></ul>' + L('solutions.html', 'استكشف الحلول ←') },
    { id: 'loan',
      k: ['loan', 'loans', 'working capital', 'finance', 'financing', 'credit', 'advance', 'funding', 'قرض', 'تمويل', 'رأس المال العامل', 'سلفة', 'ائتمان'],
      en: 'Embedded finance: after ~90 days of clean sales, <b>Working Capital</b> is pre-approved right in your dashboard. One tap, funds in 24hr, auto-repaid from sales. Credit profiles are built from your real sales data.',
      ar: 'التمويل المدمج: بعد نحو 90 يوماً من المبيعات المنتظمة، يُوافَق مسبقاً على <b>تمويل رأس المال العامل</b> مباشرة في لوحة التحكم. بنقرة واحدة، وتصلك الأموال خلال 24 ساعة، مع سداد تلقائي من المبيعات. وتُبنى الملفات الائتمانية من بيانات مبيعاتك الحقيقية.' },
    { id: 'enterprise',
      k: ['enterprise', 'chain', 'franchise', 'large', 'big business', 'youshop', 'youresto', 'youpay', 'multi outlet', 'multi-outlet', 'group', 'estate', 'المؤسسات', 'مؤسسة', 'سلسلة', 'امتياز', 'شركة كبيرة', 'فروع متعددة', 'مجموعة'],
      en: 'Enterprise = the same platform with every module on, unlimited outlets and a rollout team. Three products: <b>youShop Enterprise</b> (multi-outlet retail), <b>youResto Enterprise</b> (restaurant OS across branches) and <b>youPay Enterprise</b> (payment orchestration). 99.999% uptime, &lt;200ms auth, 1-hr SLA with a named manager. ' + L('enterprise.html', 'See Enterprise →'),
      ar: 'باقة المؤسسات هي المنصة نفسها مع تفعيل كل الوحدات، وفروع غير محدودة، وفريق إطلاق. ثلاثة منتجات: <b>youShop Enterprise</b> (تجزئة متعددة الفروع)، و<b>youResto Enterprise</b> (نظام تشغيل للمطاعم عبر الفروع)، و<b>youPay Enterprise</b> (تنسيق المدفوعات). نسبة تشغيل 99.999%، وتفويض في أقل من 200 ملّي ثانية، واستجابة خلال ساعة مع مدير مخصّص. ' + L('enterprise.html', 'عرض المؤسسات ←') },
    { id: 'security',
      k: ['security', 'secure', 'pci', 'compliance', 'data residency', 'audit', 'sso', 'saml', 'permissions', 'uptime', 'sla', 'أمان', 'الأمان', 'امتثال', 'إقامة البيانات', 'تدقيق', 'صلاحيات', 'نسبة التشغيل'],
      en: 'Built to pass your security review: PCI DSS Level 1 gateway, PCI PTS 5.x SRED terminals, CB UAE licensed acquiring partner, per-outlet / per-role permissions with full audit trail, in-region data processing, SSO (SAML / OIDC) on Enterprise, and 99.999% uptime with a 1-hour SLA. ' + L('enterprise.html#security', 'Security details →'),
      ar: 'مصمَّم لاجتياز مراجعتك الأمنية: بوابة PCI DSS المستوى الأول، وأجهزة PCI PTS 5.x SRED، وشريك استحواذ مرخّص من مصرف الإمارات المركزي، وصلاحيات لكل فرع ودور مع سجل تدقيق كامل، ومعالجة البيانات داخل المنطقة، وتسجيل دخول موحّد (SAML / OIDC) في باقة المؤسسات، ونسبة تشغيل 99.999% مع استجابة خلال ساعة. ' + L('enterprise.html#security', 'تفاصيل الأمان ←') },
    { id: 'rollout', boost: 1.5,
      k: ['rollout', 'roll out', 'erp', 'sap', 'netsuite', 'dynamics', 'tally', 'zoho', 'migration', 'migrate', 'pilot', 'implementation', 'timeline', 'إطلاق', 'ترحيل', 'انتقال', 'تجريبي', 'تنفيذ', 'جدول زمني'],
      en: 'Enterprise rollout: <b>Wk 0–2</b> scoping &amp; commercial → <b>Wk 2–4</b> two flagship outlets live → <b>Wk 4–8</b> 8–12 outlets per week → <b>Wk 8–12</b> hypercare &amp; handover to a named CSM with 24/7 support and a 1-hour P1 response. We also plug into the ERP you already run — SAP, Oracle NetSuite, MS Dynamics, Tally or Zoho.',
      ar: 'إطلاق المؤسسات: <b>الأسبوع 0–2</b> تحديد النطاق والاتفاق التجاري ← <b>الأسبوع 2–4</b> تشغيل فرعين رئيسيين ← <b>الأسبوع 4–8</b> 8–12 فرعاً أسبوعياً ← <b>الأسبوع 8–12</b> دعم مكثّف ثم التسليم إلى مدير نجاح مخصّص مع دعم على مدار الساعة واستجابة خلال ساعة. كما نتكامل مع نظام ERP الذي تستخدمه — SAP أو Oracle NetSuite أو MS Dynamics أو Tally أو Zoho.' },
    { id: 'support',
      k: ['support', 'help', 'problem', 'issue', 'contact', 'phone', 'call', 'email', 'whatsapp', 'reach', 'talk to', 'human', 'agent', 'sales', 'دعم', 'مساعدة', 'مشكلة', 'تواصل', 'اتصال', 'هاتف', 'رقم', 'بريد', 'ايميل', 'واتساب', 'موظف خدمة', 'مبيعات'],
      en: 'We\'re here 24/7 in English and Arabic:<ul><li>WhatsApp: ' + L(wa('Hi youcloud'), 'message our UAE team') + ' — replies in under 5 minutes during business hours</li><li>Sales & partnerships: ' + L('mailto:sales@youcloud.ae', 'sales@youcloud.ae') + '</li><li>Support: ' + L('mailto:support@youcloud.ae', 'support@youcloud.ae') + '</li></ul>',
      ar: 'نحن متاحون على مدار الساعة بالعربية والإنجليزية:<ul><li>واتساب: ' + L(wa('مرحباً youcloud'), 'راسل فريقنا في الإمارات') + ' — نردّ خلال أقل من 5 دقائق في ساعات العمل</li><li>المبيعات والشراكات: ' + L('mailto:sales@youcloud.ae', 'sales@youcloud.ae') + '</li><li>الدعم: ' + L('mailto:support@youcloud.ae', 'support@youcloud.ae') + '</li></ul>' },
    { id: 'demo',
      k: ['demo', 'book', 'booking', 'trial', 'try', 'test', 'see it', 'walkthrough', 'meeting', 'appointment', 'sign up', 'signup', 'buy', 'order', 'عرض توضيحي', 'احجز', 'حجز', 'تجربة', 'تجريب', 'موعد', 'اجتماع', 'اشتراك', 'شراء', 'اطلب'],
      en: 'A free 15-minute demo shows youcloud running with your own product list, menu and outlet. ' + DEMO_EN + ' — or for chains, ' + L('enterprise.html#contact', 'book a technical demo') + '.',
      ar: 'العرض المجاني لمدة 15 دقيقة يريك youcloud يعمل بقائمة منتجاتك وقائمة طعامك وفرعك. ' + DEMO_AR + ' — أو للسلاسل، ' + L('enterprise.html#contact', 'احجز عرضاً تقنياً') + '.' },
    { id: 'offline',
      k: ['offline', 'internet down', 'no internet', 'connection', 'wifi', 'wi-fi', '4g', 'دون اتصال', 'بدون انترنت', 'انقطاع', 'اتصال'],
      en: 'Billing is <b>offline-first</b> and syncs on reconnect. Devices connect over Wi-Fi, and the y10 SoundBox also runs on 4G.',
      ar: 'الفوترة <b>تعمل دون اتصال</b> وتتزامن عند عودته. تتصل الأجهزة عبر Wi-Fi، كما يعمل SoundBox y10 عبر شبكة 4G.' },
    { id: 'payments',
      k: ['payment methods', 'accept', 'card', 'cards', 'wallet', 'wallets', 'apple pay', 'google pay', 'qr', 'nfc', 'tap', 'pay by link', 'tabby', 'cash', 'وسائل الدفع', 'بطاقة', 'بطاقات', 'محفظة', 'محافظ', 'ابل باي', 'رمز qr', 'دفع عبر الرابط', 'نقد', 'كاش'],
      en: 'Accept every tender — cards (Visa, Mastercard, Amex), wallets, NFC tap, domestic QR and Pay-by-Link — on the same terminal that runs your POS. Sub-200ms authorisation, ML fraud engine, and money settles T+2.',
      ar: 'اقبل كل وسائل الدفع — البطاقات (فيزا، ماستركارد، أمريكان إكسبريس)، والمحافظ الرقمية، والدفع اللاتلامسي NFC، ورموز QR المحلية، والدفع عبر الرابط — على الجهاز نفسه الذي يشغّل نقاط البيع. تفويض في أقل من 200 ملّي ثانية، ومحرك لمكافحة الاحتيال، وتسوية خلال T+2.' }
  ];

  var UI = {
    en: {
      title: 'youcloud assistant', status: 'Online · replies instantly', placeholder: 'Ask anything about youcloud…',
      hint: 'Questions? Ask me 👋', open: 'Open chat', close: 'Close chat', send: 'Send',
      greet: 'Hi! 👋 I\'m the youcloud assistant. Ask me about pricing, hardware, payments, setup, solutions or enterprise.',
      chips: [['Pricing', 'pricing'], ['Hardware', 'hardware'], ['Go live in 60 min?', 'setup'], ['Banks & settlement', 'settlement'], ['Book a demo', 'demo']],
      fallback: 'I\'m not sure about that one yet. Our UAE team can help right away — ' + L(wa('Hi youcloud, I have a question'), 'WhatsApp us') + ' or email ' + L('mailto:sales@youcloud.ae', 'sales@youcloud.ae') + '. You can also ' + DEMO_EN.replace('Book', 'book') + '.'
    },
    ar: {
      title: 'مساعد youcloud', status: 'متصل · يردّ فوراً', placeholder: 'اسأل أي شيء عن youcloud…',
      hint: 'لديك سؤال؟ اسألني 👋', open: 'فتح المحادثة', close: 'إغلاق المحادثة', send: 'إرسال',
      greet: 'مرحباً! 👋 أنا مساعد youcloud. اسألني عن الأسعار، الأجهزة، المدفوعات، الإعداد، الحلول أو باقة المؤسسات.',
      chips: [['الأسعار', 'pricing'], ['الأجهزة', 'hardware'], ['البدء خلال 60 دقيقة؟', 'setup'], ['البنوك والتسوية', 'settlement'], ['احجز عرضاً', 'demo']],
      fallback: 'لست متأكداً من هذا بعد. يمكن لفريقنا في الإمارات مساعدتك فوراً — ' + L(wa('مرحباً youcloud، لدي سؤال'), 'راسلنا على واتساب') + ' أو عبر البريد ' + L('mailto:sales@youcloud.ae', 'sales@youcloud.ae') + '. ويمكنك أيضاً أن ' + DEMO_AR + '.'
    }
  };

  /* ---------- Matching ---------- */
  function norm(s) {
    return String(s).toLowerCase()
      .replace(/[ً-ْـ]/g, '')
      .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
      .replace(/[^\p{L}\p{N}+&\s-]/gu, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  KB.forEach(function (e) { e.nk = e.k.map(norm); });

  function score(q, e) {
    var s = 0, qp = ' ' + q + ' ';
    var qt = q.split(' ').filter(function (t) { return t.length > 2; });
    e.nk.forEach(function (k) {
      if (!k) return;
      var words = k.split(' ').length;
      var hit = words > 1 || k.length > 3 ? qp.indexOf(k) !== -1 : (qp.indexOf(' ' + k + ' ') !== -1 || qp.indexOf(' ال' + k + ' ') !== -1);
      if (hit) { s += 2 * words + (k.length > 5 ? 1 : 0); return; }
      if (words === 1 && k.length >= 4) {
        for (var i = 0; i < qt.length; i++) {
          var t = qt[i];
          // Arabic definite article "ال" and light stemming
          var tb = t.replace(/^(وال|بال|فال|لل|ال|و)/, '');
          var kb = k.replace(/^ال/, '');
          if (t.length >= 4 && (k.indexOf(t) === 0 || t.indexOf(k) === 0)) { s += 1; break; }
          if (tb.length >= 3 && kb.length >= 3 && (tb === kb || tb.indexOf(kb) === 0 || kb.indexOf(tb) === 0)) { s += 1; break; }
        }
      }
    });
    return s;
  }
  function answer(text, lang) {
    var q = norm(text);
    var best = null, bestS = 0;
    KB.forEach(function (e) {
      var s = score(q, e) * (e.boost || 1);
      if (e.id === 'hello' || e.id === 'thanks') s = q.split(' ').length <= 4 ? s : s * 0.3;
      if (s > bestS) { best = e; bestS = s; }
    });
    if (!best || bestS < 2) return UI[lang].fallback;
    return best[lang];
  }

  /* ---------- UI ---------- */
  var lang = (window.YC_lang && window.YC_lang()) || 'en';
  var root = document.createElement('div');
  root.className = 'chat-root';
  root.innerHTML =
    '<div class="chat-hint" aria-hidden="true"></div>' +
    '<section class="chat-panel" role="dialog" aria-label="youcloud assistant" aria-hidden="true">' +
      '<header class="chat-head">' +
        '<div class="chat-av"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/></svg></div>' +
        '<div><b class="c-title"></b><small class="c-status"></small></div>' +
      '</header>' +
      '<div class="chat-body" aria-live="polite"></div>' +
      '<div class="chat-chips"></div>' +
      '<form class="chat-form" autocomplete="off">' +
        '<input type="text" name="q" maxlength="300" aria-label="Message">' +
        '<button type="submit" aria-label="Send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>' +
      '</form>' +
    '</section>' +
    '<button class="chat-launch" type="button" aria-expanded="false">' +
      '<svg class="i-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 20l1.1-4.2A8.4 8.4 0 1 1 21 11.5z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>' +
      '<svg class="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
    '</button>';
  document.body.appendChild(root);

  var panel = root.querySelector('.chat-panel');
  var body = root.querySelector('.chat-body');
  var chips = root.querySelector('.chat-chips');
  var form = root.querySelector('.chat-form');
  var input = form.querySelector('input');
  var launch = root.querySelector('.chat-launch');
  var hint = root.querySelector('.chat-hint');
  var greeted = false;

  function paintUI() {
    var u = UI[lang];
    root.querySelector('.c-title').textContent = u.title;
    root.querySelector('.c-status').textContent = u.status;
    input.placeholder = u.placeholder;
    hint.textContent = u.hint;
    launch.setAttribute('aria-label', document.body.classList.contains('chat-open') ? u.close : u.open);
    form.querySelector('button').setAttribute('aria-label', u.send);
    panel.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    chips.innerHTML = '';
    u.chips.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = c[0];
      b.addEventListener('click', function () { ask(c[0], c[1]); });
      chips.appendChild(b);
    });
  }

  function addMsg(html, who, asText) {
    var m = document.createElement('div');
    m.className = 'msg ' + who;
    if (asText) m.textContent = html; else m.innerHTML = (/[\u0600-\u06FF]/.test(html) && window.YC_ltrTerms) ? window.YC_ltrTerms(html) : html;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
    return m;
  }

  function botReply(html) {
    var t = document.createElement('div');
    t.className = 'msg bot typing';
    t.innerHTML = '<i></i><i></i><i></i>';
    body.appendChild(t);
    body.scrollTop = body.scrollHeight;
    setTimeout(function () { t.remove(); addMsg(html, 'bot'); }, 550 + Math.min(900, html.length * 2));
  }

  function detectLang(text) {
    if (/[؀-ۿ]/.test(text)) return 'ar';
    if (/[a-z]/i.test(text)) return 'en';
    return lang;
  }

  function ask(text, id) {
    addMsg(text, 'user', true);
    var l = detectLang(text);
    var entry = id && KB.filter(function (e) { return e.id === id; })[0];
    botReply(entry ? entry[l] : answer(text, l));
  }

  function setOpen(open) {
    document.body.classList.toggle('chat-open', open);
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    launch.setAttribute('aria-expanded', open ? 'true' : 'false');
    launch.setAttribute('aria-label', open ? UI[lang].close : UI[lang].open);
    if (open) {
      hint.classList.remove('show');
      if (!greeted) { greeted = true; botReply(UI[lang].greet); }
      setTimeout(function () { if (window.matchMedia('(min-width: 681px)').matches) input.focus(); }, 350);
    }
  }

  launch.addEventListener('click', function () { setOpen(!document.body.classList.contains('chat-open')); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value.trim();
    if (!v) return;
    input.value = '';
    ask(v);
  });
  body.addEventListener('click', function (e) {
    if (e.target.closest('[data-chat-demo]')) {
      e.preventDefault();
      setOpen(false);
      if (window.YC_openDemo) window.YC_openDemo();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('chat-open') && !document.querySelector('.modal.open')) setOpen(false);
  });
  document.addEventListener('yc:lang', function (e) { lang = e.detail.lang; paintUI(); });

  paintUI();
  setTimeout(function () { if (!document.body.classList.contains('chat-open')) hint.classList.add('show'); }, 4000);
  setTimeout(function () { hint.classList.remove('show'); }, 11000);
})();
