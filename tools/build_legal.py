# Generates privacy.html, terms.html, cookies.html, disclaimer.html and js/i18n-legal.js
import json, html, re

import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..') + os.sep

PAGES = [
  dict(slug='privacy', num='01', en_name='Privacy', ar_name='الخصوصية',
    en_title='What data we hold, and what we do with it.',
    ar_title='ما البيانات التي نحتفظ بها، وماذا نفعل بها.',
    en_sum="We hold the data you need to run your business on youcloud — your merchant account, your sales, your staff, your customers' contact details. We don't sell your data. We don't share it with third parties for marketing. Cardholder data never touches your POS — it's tokenised at the terminal.",
    ar_sum='نحتفظ بالبيانات التي تحتاجها لإدارة نشاطك على youcloud — حساب التاجر، ومبيعاتك، وموظفيك، وبيانات التواصل مع عملائك. لا نبيع بياناتك، ولا نشاركها مع أطراف ثالثة لأغراض تسويقية. ولا تمرّ بيانات حاملي البطاقات عبر نظام نقاط البيع لديك أبداً — إذ تُرمَّز (Tokenisation) عند الجهاز.',
    sections=[
      ('collect', 'What we collect', 'ما الذي نجمعه', [
        ('p', 'To run your youcloud account, we collect and store three kinds of data:', 'لتشغيل حسابك على youcloud، نجمع ونخزّن ثلاثة أنواع من البيانات:'),
        ('ul', [
          ('Merchant account data', 'your business name, trade licence, VAT registration, contact details, bank account for settlement, and the identity documents required by our CB UAE-licensed acquiring partner (KYC / AML).',
           'بيانات حساب التاجر', 'اسم نشاطك التجاري، والرخصة التجارية، وتسجيل ضريبة القيمة المضافة، وبيانات التواصل، والحساب البنكي للتسوية، ووثائق الهوية التي يطلبها شريك الاستحواذ المرخّص من مصرف الإمارات المركزي (اعرف عميلك / مكافحة غسل الأموال).'),
          ('Operational data', 'everything you actively use the platform for: sales, invoices, inventory, staff rosters, payroll, customer contacts, loyalty points, and the transaction logs across your outlets.',
           'البيانات التشغيلية', 'كل ما تستخدم المنصة من أجله فعلياً: المبيعات، والفواتير، والمخزون، وجداول الموظفين، والرواتب، وجهات اتصال العملاء، ونقاط الولاء، وسجلات المعاملات في جميع فروعك.'),
          ('Technical data', 'device IDs of your terminals, app version, IP address, session logs, and performance telemetry so we can keep the service up and fix bugs.',
           'البيانات التقنية', 'معرّفات أجهزتك، وإصدار التطبيق، وعنوان IP، وسجلات الجلسات، وبيانات قياس الأداء، لنحافظ على استمرارية الخدمة ونصلح الأعطال.'),
        ]),
      ]),
      ('never', 'What we never see', 'ما لا نراه أبداً', [
        ('p', 'Cardholder data (the 16-digit card number, CVV, PIN) is tokenised at the terminal and never touches your merchant POS or your merchant network. We hold the last 4 digits and a scheme reference for reconciliation — nothing more.',
              'تُرمَّز بيانات حاملي البطاقات (رقم البطاقة المكوّن من 16 خانة، ورمز CVV، والرقم السري) عند الجهاز، ولا تمرّ أبداً عبر نظام نقاط البيع أو شبكة التاجر. نحتفظ بآخر 4 أرقام ومرجع شبكة البطاقة لأغراض المطابقة فقط — لا أكثر.'),
      ]),
      ('why', 'Why we hold it', 'لماذا نحتفظ بها', [
        ('ul', [
          ('To provide the service', 'running your POS, settling payments, filing VAT, paying your staff, sending WhatsApp campaigns you\'ve configured.',
           'لتقديم الخدمة', 'تشغيل نقاط البيع، وتسوية المدفوعات، وتقديم إقرارات ضريبة القيمة المضافة، ودفع رواتب موظفيك، وإرسال حملات واتساب التي أعددتها.'),
          ('To comply with UAE law', 'CB UAE, FTA (VAT/e-invoicing), UAE labour law (payroll retention), anti-money-laundering regulations.',
           'للامتثال لقوانين دولة الإمارات', 'متطلبات مصرف الإمارات المركزي، والهيئة الاتحادية للضرائب (ضريبة القيمة المضافة / الفوترة الإلكترونية)، وقانون العمل الإماراتي (الاحتفاظ بسجلات الرواتب)، وأنظمة مكافحة غسل الأموال.'),
          ('To improve the platform', 'anonymised, aggregated performance data helps us fix bugs and prioritise features. Never used to profile individuals.',
           'لتحسين المنصة', 'تساعدنا بيانات الأداء المجمّعة والمجهولة الهوية على إصلاح الأعطال وتحديد أولويات الميزات، ولا تُستخدم أبداً لبناء ملفات تعريفية عن الأفراد.'),
        ]),
      ]),
      ('share', 'Who we share it with', 'مع مَن نشاركها', [
        ('ul', [
          ('Our CB UAE-licensed acquiring partner', 'as required to settle your card transactions to your UAE IBAN.',
           'شريك الاستحواذ المرخّص من مصرف الإمارات المركزي', 'بالقدر اللازم لتسوية معاملات البطاقات إلى حسابك IBAN في الإمارات.'),
          ('The FTA', 'VAT filings and e-invoice submissions, on your behalf, as required by UAE tax law.',
           'الهيئة الاتحادية للضرائب', 'لتقديم إقرارات ضريبة القيمة المضافة والفواتير الإلكترونية نيابةً عنك، وفق ما يقتضيه قانون الضرائب الإماراتي.'),
          ('Cloud infrastructure providers (data-centres in the UAE)', 'under strict processor agreements. Data does not leave the UAE for merchants on our default UAE region.',
           'مزوّدو البنية التحتية السحابية (مراكز بيانات داخل الإمارات)', 'بموجب اتفاقيات معالجة صارمة. ولا تغادر البيانات دولة الإمارات للتجار المسجّلين على منطقتنا الافتراضية في الإمارات.'),
          ('Never', 'advertisers, data brokers, or unrelated third parties for marketing purposes.',
           'أبداً', 'لا نشاركها مع المعلنين أو وسطاء البيانات أو أي أطراف ثالثة غير ذات صلة لأغراض تسويقية.'),
        ]),
      ]),
      ('retention', 'How long we keep it', 'مدة الاحتفاظ بها', [
        ('p', 'Transaction records: 7 years (UAE VAT + AML retention rules). Payroll records: 2 years after termination (UAE labour law). Marketing contact lists: until the customer unsubscribes, or you delete them. Merchant KYC: 5 years after account closure.',
              'سجلات المعاملات: 7 سنوات (وفق قواعد الاحتفاظ الخاصة بضريبة القيمة المضافة ومكافحة غسل الأموال في الإمارات). سجلات الرواتب: سنتان بعد انتهاء الخدمة (وفق قانون العمل الإماراتي). قوائم التواصل التسويقي: حتى يلغي العميل اشتراكه أو تحذفها أنت. بيانات «اعرف عميلك» للتاجر: 5 سنوات بعد إغلاق الحساب.'),
      ]),
      ('rights', 'Your rights', 'حقوقك', [
        ('p', 'You can request a full export of your data at any time, in machine-readable format, from the dashboard or by emailing us. You can request correction of inaccurate data, or deletion — subject to the statutory retention periods above.',
              'يمكنك في أي وقت طلب تصدير كامل لبياناتك بصيغة قابلة للقراءة آلياً، من لوحة التحكم أو بمراسلتنا عبر البريد الإلكتروني. كما يمكنك طلب تصحيح البيانات غير الدقيقة أو حذفها — مع مراعاة فترات الاحتفاظ القانونية المذكورة أعلاه.'),
      ]),
    ],
    en_contact='<b>Data protection contact:</b> <a href="mailto:dpo@youcloud.ae">dpo@youcloud.ae</a> · Response within 5 business days.',
    ar_contact='<b>جهة التواصل لحماية البيانات:</b> <a href="mailto:dpo@youcloud.ae">dpo@youcloud.ae</a> · نردّ خلال 5 أيام عمل.'),

  dict(slug='terms', num='02', en_name='Terms of Use', ar_name='شروط الاستخدام',
    en_title='What you get, and what we promise you.',
    ar_title='ما تحصل عليه، وما نلتزم به تجاهك.',
    en_sum='You subscribe to youcloud, we give you a working platform and support it. You pay on time and don\'t use it to do anything illegal. You own your data. You can leave any time. No lock-in, no data hostage-taking.',
    ar_sum='تشترك في youcloud، فنقدّم لك منصة تعمل بكفاءة وندعمها. وأنت تدفع في الموعد ولا تستخدمها في أي نشاط غير قانوني. بياناتك ملكك، ويمكنك المغادرة في أي وقت. لا احتكار، ولا احتجاز للبيانات.',
    sections=[
      ('deal', 'The deal', 'الاتفاق', [
        ('p', 'These terms cover your use of the youcloud platform, including any subscribed modules, add-ons, hardware kits, and payment services. By activating your merchant account, you agree to these terms.',
              'تغطي هذه الشروط استخدامك لمنصة youcloud، بما في ذلك أي وحدات أو إضافات مشترك بها، وأطقم الأجهزة، وخدمات الدفع. وبتفعيل حساب التاجر الخاص بك، فإنك توافق على هذه الشروط.'),
      ]),
      ('subscription', 'Your subscription', 'اشتراكك', [
        ('ul', [
          (None, 'Standard and Power tiers are billed annually in AED, in advance, on the plan you selected at signup.', None, 'تُفوتَر الباقتان الأساسية والمتقدمة سنوياً بالدرهم الإماراتي مقدّماً، وفق الخطة التي اخترتها عند التسجيل.'),
          (None, 'Enterprise contracts are annual with terms defined in your commercial agreement (MSA + SLA schedule).', None, 'عقود المؤسسات سنوية، وتُحدَّد شروطها في اتفاقيتك التجارية (اتفاقية الخدمات الرئيسية + جدول مستوى الخدمة).'),
          (None, 'You can upgrade at any time — pro-rated. You can downgrade or cancel at the end of the current annual term, with 30 days\' notice.', None, 'يمكنك الترقية في أي وقت — بتكلفة تناسبية. ويمكنك تخفيض الباقة أو الإلغاء في نهاية المدة السنوية الحالية، بإشعار مسبق مدته 30 يوماً.'),
          (None, 'Hardware kits are one-time purchases — you own them. No lease traps, no return-on-cancellation clauses.', None, 'أطقم الأجهزة تُشترى بدفعة واحدة — وتصبح ملكك. لا فخاخ تأجير، ولا بنود لإعادة الأجهزة عند الإلغاء.'),
        ]),
      ]),
      ('payments', 'Payment processing', 'معالجة المدفوعات', [
        ('p', 'MDR (Merchant Discount Rate) applies to every card, wallet, or QR transaction and is deducted at settlement per the rates quoted in your commercial terms. There are no separate setup or gateway fees. Settlement is T+2 to your UAE IBAN, subject to standard fraud and risk checks.',
              'يُطبَّق معدل خصم التاجر (MDR) على كل معاملة بالبطاقة أو المحفظة أو رمز QR، ويُخصم عند التسوية وفق الأسعار المحددة في شروطك التجارية. لا توجد رسوم منفصلة للإعداد أو البوابة. وتتم التسوية خلال T+2 إلى حسابك IBAN في الإمارات، مع مراعاة فحوصات الاحتيال والمخاطر المعتادة.'),
      ]),
      ('not-allowed', 'What you agree not to do', 'ما توافق على عدم القيام به', [
        ('ul', [
          (None, 'Use the platform to process payments for anything illegal under UAE law (gambling, adult content, unlicensed financial services, sanctioned goods).', None, 'استخدام المنصة لمعالجة مدفوعات لأي نشاط غير قانوني بموجب قوانين الإمارات (المقامرة، والمحتوى الإباحي، والخدمات المالية غير المرخّصة، والسلع الخاضعة للعقوبات).'),
          (None, 'Attempt to reverse-engineer, tamper with, or resell the platform without a partner agreement.', None, 'محاولة الهندسة العكسية للمنصة أو العبث بها أو إعادة بيعها دون اتفاقية شراكة.'),
          (None, 'Use the platform to send spam, scam customers, or violate WhatsApp Business API policies.', None, 'استخدام المنصة لإرسال رسائل مزعجة، أو الاحتيال على العملاء، أو مخالفة سياسات واجهة واتساب للأعمال (WhatsApp Business API).'),
          (None, 'Impersonate another merchant, use false identity documents, or launder funds.', None, 'انتحال صفة تاجر آخر، أو استخدام وثائق هوية مزوّرة، أو غسل الأموال.'),
        ]),
        ('p', 'Violation = suspension. Serious violations may result in permanent termination and reporting to CB UAE and relevant authorities.',
              'المخالفة تعني إيقاف الحساب. وقد تؤدي المخالفات الجسيمة إلى إنهاء الحساب نهائياً وإبلاغ مصرف الإمارات المركزي والجهات المختصة.'),
      ]),
      ('uptime', 'Our uptime commitment', 'التزامنا بنسبة التشغيل', [
        ('ul', [
          ('Standard & Power tiers', '99.9% platform uptime, email/chat support with 24-hour SLA.',
           'الباقتان الأساسية والمتقدمة', 'نسبة تشغيل للمنصة 99.9%، ودعم عبر البريد الإلكتروني والدردشة مع استجابة خلال 24 ساعة.'),
          ('Enterprise tier', '99.999% uptime, 1-hour incident response, 24/7 phone support with a named engineer, service credits if we miss.',
           'باقة المؤسسات', 'نسبة تشغيل 99.999%، واستجابة للحوادث خلال ساعة واحدة، ودعم هاتفي على مدار الساعة مع مهندس مخصّص، وأرصدة خدمة تعويضية إذا لم نلتزم.'),
        ]),
      ]),
      ('ownership', 'Your data, your ownership', 'بياناتك ملكك', [
        ('p', 'Every byte of merchant data you generate on youcloud — sales, customer records, inventory, staff records — belongs to you. On cancellation, you get a full export in machine-readable format (CSV / JSON) at no charge. We retain the statutory minimum required by UAE law (see Privacy) and delete the rest within 90 days of your written request.',
              'كل بايت من بيانات التاجر التي تُنشئها على youcloud — المبيعات، وسجلات العملاء، والمخزون، وسجلات الموظفين — ملكٌ لك. وعند الإلغاء، تحصل على تصدير كامل بصيغة قابلة للقراءة آلياً (CSV / JSON) دون أي رسوم. نحتفظ بالحد الأدنى الذي يفرضه القانون الإماراتي (راجع سياسة الخصوصية)، ونحذف الباقي خلال 90 يوماً من طلبك الكتابي.'),
      ]),
      ('liability', 'Liability', 'المسؤولية', [
        ('p', 'We are liable for direct losses caused by our proven negligence, capped at the fees you paid us in the 12 months before the incident. We are not liable for indirect losses, lost profits, or losses caused by force majeure, third-party outages (banks, telcos, aggregators), or your own violation of these terms.',
              'نتحمّل المسؤولية عن الخسائر المباشرة الناتجة عن إهمال ثابت من جانبنا، بحدٍّ أقصى يعادل الرسوم التي دفعتها لنا خلال الأشهر الاثني عشر السابقة للحادثة. ولا نتحمّل المسؤولية عن الخسائر غير المباشرة، أو الأرباح الفائتة، أو الخسائر الناتجة عن القوة القاهرة، أو انقطاع خدمات الأطراف الثالثة (البنوك، وشركات الاتصالات، ومنصات التوصيل)، أو مخالفتك لهذه الشروط.'),
      ]),
      ('law', 'Governing law', 'القانون الحاكم', [
        ('p', 'These terms are governed by the laws of the United Arab Emirates. Disputes are subject to the exclusive jurisdiction of the DIFC Courts, unless your commercial agreement specifies otherwise.',
              'تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة. وتختص محاكم مركز دبي المالي العالمي حصرياً بالنظر في أي نزاعات، ما لم تنص اتفاقيتك التجارية على خلاف ذلك.'),
      ]),
    ],
    en_contact='<b>Legal contact:</b> <a href="mailto:dpo@youcloud.ae">dpo@youcloud.ae</a> · Response within 5 business days.',
    ar_contact='<b>جهة التواصل القانونية:</b> <a href="mailto:dpo@youcloud.ae">dpo@youcloud.ae</a> · نردّ خلال 5 أيام عمل.'),

  dict(slug='cookies', num='03', en_name='Cookies', ar_name='ملفات تعريف الارتباط',
    en_title='What cookies our website uses, and why.',
    ar_title='ملفات تعريف الارتباط التي يستخدمها موقعنا، ولماذا.',
    en_sum='This marketing website uses a few essential cookies to keep it working, and a small analytics cookie to understand which pages help merchants sign up. No advertising cookies. No cross-site tracking. The youcloud merchant dashboard has its own cookie policy (much stricter — session-only, no analytics).',
    ar_sum='يستخدم هذا الموقع التسويقي عدداً قليلاً من ملفات تعريف الارتباط الأساسية ليعمل بشكل سليم، وملف تحليلات صغيراً لفهم الصفحات التي تساعد التجار على التسجيل. لا ملفات إعلانية، ولا تتبّع عبر المواقع. ولوحة تحكم التجار في youcloud لها سياسة خاصة بملفات تعريف الارتباط (أكثر صرامة بكثير — للجلسة فقط، وبلا تحليلات).',
    sections=[
      ('what', 'What is a cookie?', 'ما هو ملف تعريف الارتباط؟', [
        ('p', 'A cookie is a small text file a website places on your device so it can remember you (or a preference you set) on your next visit. Some are essential to make the site work; others help us understand usage.',
              'ملف تعريف الارتباط (Cookie) هو ملف نصي صغير يضعه الموقع على جهازك ليتذكّرك (أو يتذكّر تفضيلاً اخترته) في زيارتك التالية. بعضها ضروري لعمل الموقع، وبعضها يساعدنا على فهم طريقة الاستخدام.'),
      ]),
      ('use', 'What we use on this website', 'ما نستخدمه على هذا الموقع', [
        ('ul', [
          ('Essential cookies', 'remember your language preference, dismissed banners, and dark/light mode. Cannot be disabled without breaking the site.',
           'ملفات أساسية', 'تتذكّر تفضيل اللغة، والإشعارات التي أغلقتها، والوضع الداكن/الفاتح. ولا يمكن تعطيلها دون التأثير على عمل الموقع.'),
          ('Analytics cookie', 'a single, privacy-respecting analytics cookie (no third-party ad networks, no personal identifiers, IP anonymised) so we know which pages help merchants and which we should improve.',
           'ملف التحليلات', 'ملف تحليلات واحد يحترم الخصوصية (بلا شبكات إعلانية خارجية، وبلا معرّفات شخصية، ومع إخفاء عنوان IP) لنعرف الصفحات التي تفيد التجار والصفحات التي ينبغي تحسينها.'),
        ]),
      ]),
      ('not-used', 'What we do NOT use', 'ما لا نستخدمه', [
        ('ul', [
          (None, 'Advertising cookies', None, 'ملفات تعريف الارتباط الإعلانية'),
          (None, 'Cross-site tracking pixels', None, 'وحدات البكسل للتتبّع عبر المواقع'),
          (None, 'Facebook, TikTok, LinkedIn tracking pixels (we don\'t use them)', None, 'وحدات بكسل التتبّع من فيسبوك وتيك توك ولينكدإن (لا نستخدمها)'),
          (None, 'Any cookie that shares data with third-party marketing networks', None, 'أي ملف يشارك البيانات مع شبكات تسويق تابعة لأطراف ثالثة'),
        ]),
      ]),
      ('manage', 'Managing your cookies', 'إدارة ملفات تعريف الارتباط', [
        ('p', 'Every browser lets you view, delete, or block cookies from your settings. If you block all cookies, some of this site may not work as expected — the merchant dashboard requires session cookies to keep you signed in.',
              'يتيح لك كل متصفح عرض ملفات تعريف الارتباط أو حذفها أو حظرها من الإعدادات. وإذا حظرت جميع الملفات، فقد لا تعمل بعض أجزاء هذا الموقع كما ينبغي — إذ تتطلب لوحة تحكم التجار ملفات الجلسة لإبقائك مسجّلاً للدخول.'),
      ]),
    ],
    en_contact='', ar_contact=''),

  dict(slug='disclaimer', num='04', en_name='Disclaimer', ar_name='إخلاء المسؤولية',
    en_title='The small print, spelled out honestly.',
    ar_title='التفاصيل الدقيقة، بكل وضوح وصدق.',
    en_sum='Screenshots on this site use illustrative sample data. Merchant names and quotes are pilot merchants. Prices are in AED, exclusive of VAT unless stated. Third-party names (Talabat, Careem, Deliveroo, Geidea, Network International, Emirates NBD, FAB, ADCB, Mashreq) belong to their owners and are used for reference only.',
    ar_sum='تستخدم لقطات الشاشة على هذا الموقع بيانات توضيحية نموذجية. وأسماء التجار واقتباساتهم من تجار المرحلة التجريبية. الأسعار بالدرهم الإماراتي ولا تشمل ضريبة القيمة المضافة ما لم يُذكر خلاف ذلك. وأسماء الأطراف الثالثة (طلبات، كريم، ديليفرو، Geidea، Network International، بنك الإمارات دبي الوطني، بنك أبوظبي الأول، بنك أبوظبي التجاري، بنك المشرق) مملوكة لأصحابها وتُذكر للإشارة فقط.',
    sections=[
      ('screens', 'Illustrative screens', 'الشاشات التوضيحية', [
        ('p', 'The dashboard mockups, order tickets, revenue heatmaps, and other UI screenshots on this website are illustrative representations of the product. They use sample data (Marina outlet, Karama outlet, sample SKUs like "Basmati Rice 5kg" and "Arabic Coffee 250g") to show what the product looks like — not real merchant data.',
              'نماذج لوحات التحكم، وتذاكر الطلبات، والخرائط الحرارية للإيرادات، وغيرها من لقطات واجهة الاستخدام على هذا الموقع هي تمثيلات توضيحية للمنتج. وتستخدم بيانات نموذجية (فرع مارينا، وفرع الكرامة، وأصناف نموذجية مثل «أرز بسمتي 5 كجم» و«قهوة عربية 250 جم») لإظهار شكل المنتج — وليست بيانات تجار حقيقية.'),
      ]),
      ('quotes', 'Merchant quotes and case studies', 'اقتباسات التجار ودراسات الحالة', [
        ('p', 'Testimonials, quotes, and case-study references on this site are from real youcloud pilot merchants across the UAE. Some names have been shortened or lightly edited with the merchant\'s permission.',
              'الشهادات والاقتباسات ومراجع دراسات الحالة على هذا الموقع مأخوذة من تجار حقيقيين شاركوا في المرحلة التجريبية لـ youcloud في أنحاء الإمارات. وقد اختُصرت بعض الأسماء أو عُدّلت تعديلاً طفيفاً بإذن التاجر.'),
      ]),
      ('pricing', 'Pricing', 'الأسعار', [
        ('p', 'All prices displayed are in AED (Arab Emirates Dirham). Software subscription prices are exclusive of 5% UAE VAT unless the page states "VAT-inclusive". Hardware prices are one-time and inclusive of delivery within the UAE. Payment processing rates (MDR) are indicative bands — actual rates are confirmed in your commercial agreement.',
              'جميع الأسعار المعروضة بالدرهم الإماراتي. وأسعار اشتراكات البرمجيات لا تشمل ضريبة القيمة المضافة البالغة 5% ما لم تذكر الصفحة أنها «شاملة الضريبة». وأسعار الأجهزة تُدفع مرة واحدة وتشمل التوصيل داخل الإمارات. أما معدلات معالجة المدفوعات (MDR) فهي نطاقات استرشادية — وتُؤكَّد المعدلات الفعلية في اتفاقيتك التجارية.'),
      ]),
      ('compliance', 'Compliance & performance claims', 'ادعاءات الامتثال والأداء', [
        ('p', 'PCI DSS Level 1, PCI PTS 5.x SRED, EMV L1 + L2, SOC 2 Type II, and ISO 27001 references reflect the compliance posture of the platform and our infrastructure providers as of the "last updated" date at the top of this page. Uptime SLAs (99.9% Standard, 99.999% Enterprise) are contractual commitments defined in each tier\'s service schedule. Historical performance is not a guarantee of future performance.',
              'تعكس الإشارات إلى PCI DSS المستوى الأول، وPCI PTS 5.x SRED، وEMV L1 + L2، وSOC 2 Type II، وISO 27001 وضع الامتثال للمنصة ولمزوّدي البنية التحتية لدينا حتى تاريخ «آخر تحديث» المذكور أعلى هذه الصفحة. واتفاقيات مستوى الخدمة لنسبة التشغيل (99.9% للباقة الأساسية، و99.999% للمؤسسات) التزامات تعاقدية محددة في جدول الخدمة لكل باقة. والأداء السابق لا يضمن الأداء المستقبلي.'),
      ]),
      ('marks', 'Third-party marks', 'العلامات التجارية للأطراف الثالثة', [
        ('p', 'Talabat, Careem, Deliveroo, Geidea, Network International, Emirates NBD, First Abu Dhabi Bank (FAB), ADCB, Mashreq, RAKBANK, Dubai Islamic Bank, WhatsApp, Apple Pay, Samsung Pay, Google Pay, and any other product or company names mentioned on this site are trademarks of their respective owners. They are used here for descriptive and comparative reference only. Their mention does not imply endorsement, affiliation, or partnership unless explicitly stated.',
              'طلبات، وكريم، وديليفرو، وGeidea، وNetwork International، وبنك الإمارات دبي الوطني، وبنك أبوظبي الأول (FAB)، وبنك أبوظبي التجاري (ADCB)، وبنك المشرق، وبنك رأس الخيمة الوطني (RAKBANK)، وبنك دبي الإسلامي، وواتساب، وApple Pay، وSamsung Pay، وGoogle Pay، وأي أسماء منتجات أو شركات أخرى مذكورة على هذا الموقع هي علامات تجارية مملوكة لأصحابها. وتُستخدم هنا لأغراض الوصف والمقارنة فقط، ولا يعني ذكرها أي تأييد أو انتساب أو شراكة ما لم يُصرَّح بذلك.'),
      ]),
      ('advice', 'Not financial advice', 'ليست استشارة مالية', [
        ('p', 'Nothing on this site is investment, financial, tax, or legal advice. Merchants should consult their own advisors for tax, VAT, WPS, or licensing matters specific to their business.',
              'لا يُعدّ أي محتوى على هذا الموقع استشارة استثمارية أو مالية أو ضريبية أو قانونية. وينبغي للتجار استشارة مستشاريهم الخاصين في المسائل الضريبية وضريبة القيمة المضافة ونظام حماية الأجور والتراخيص الخاصة بنشاطهم.'),
      ]),
    ],
    en_contact='<b>Corrections:</b> Spot something on this site that needs correcting? Email <a href="mailto:dpo@youcloud.ae">dpo@youcloud.ae</a> — we\'ll fix it fast.',
    ar_contact='<b>التصحيحات:</b> هل لاحظت شيئاً على هذا الموقع يحتاج إلى تصحيح؟ راسلنا على <a href="mailto:dpo@youcloud.ae">dpo@youcloud.ae</a> — وسنصلحه بسرعة.'),
]

COMMON = {
  'l.eyebrow': ('Legal', 'الشؤون القانونية'),
  'l.meta': ('Effective 19 September 2026 · Last updated 19 September 2026 · Governing law: UAE',
             'سارية من 19 سبتمبر 2026 · آخر تحديث 19 سبتمبر 2026 · القانون الحاكم: دولة الإمارات'),
  'l.oneline': ('In one line', 'باختصار'),
  'l.onpage': ('On this page', 'في هذه الصفحة'),
  'l.top': ('Back to top', 'العودة إلى الأعلى'),
  'l.q.k': ('Still have questions?', 'هل لا تزال لديك أسئلة؟'),
  'l.q.h': ('Talk to our UAE team.', 'تحدّث إلى فريقنا في الإمارات.'),
  'l.q.p': ('Anything unclear? Something you\'d like in writing before you sign? Email us and our UAE team will get back to you — in English or Arabic.',
            'هل هناك ما هو غير واضح؟ أو شيء تودّ الحصول عليه كتابياً قبل التوقيع؟ راسلنا وسيعود إليك فريقنا في الإمارات — بالعربية أو الإنجليزية.'),
  'l.q.email': ('Email dpo@youcloud.ae', 'راسلنا على dpo@youcloud.ae'),
  'l.q.demo': ('Book a 15-min demo', 'احجز عرضاً لمدة 15 دقيقة'),
}

ar = {}
for k, (e, a) in COMMON.items(): ar[k] = a

def esc(t): return html.escape(t, quote=False)

for i, p in enumerate(PAGES):
    s = p['slug']; pre = 'l.' + s
    ar[pre + '.meta'] = p['ar_name'] + ' — youcloud الإمارات'
    ar[pre + '.name'] = p['ar_name']
    ar[pre + '.title'] = p['ar_title']
    ar[pre + '.sum'] = p['ar_sum']
    tabs = ''.join(
        '<a href="%s.html"%s><small>%s</small><span data-i18n="l.%s.name">%s</span></a>' % (
            q['slug'], ' class="active" aria-current="page"' if q is p else '', q['num'], q['slug'], esc(q['en_name']))
        for q in PAGES)
    toc, body = [], []
    for sid, eh, ah, blocks in p['sections']:
        hk = '%s.%s.h' % (pre, sid)
        ar[hk] = ah
        toc.append('<li><a href="#%s" data-i18n="%s">%s</a></li>' % (sid, hk, esc(eh)))
        out = ['<section class="legal-sec reveal" id="%s">' % sid, '<h2 data-i18n="%s">%s</h2>' % (hk, esc(eh))]
        for bi, b in enumerate(blocks):
            if b[0] == 'p':
                k = '%s.%s.p%d' % (pre, sid, bi); ar[k] = esc(b[2])
                out.append('<p data-i18n="%s">%s</p>' % (k, esc(b[1])))
            else:
                out.append('<ul class="legal-list">')
                for li, (lead, rest, alead, arest) in enumerate(b[1]):
                    k = '%s.%s.l%d' % (pre, sid, li)
                    if lead:
                        en_html = '<b>%s</b> — %s' % (esc(lead), esc(rest))
                        ar[k] = '<b>%s</b> — %s' % (esc(alead), esc(arest))
                    else:
                        en_html = esc(rest); ar[k] = esc(arest)
                    out.append('<li data-i18n="%s">%s</li>' % (k, en_html))
                out.append('</ul>')
        out.append('</section>')
        body.append('\n'.join(out))
    contact = ''
    if p['en_contact']:
        ar[pre + '.contact'] = p['ar_contact']
        contact = '<p class="legal-contact reveal" data-i18n="%s.contact">%s</p>' % (pre, p['en_contact'])
    prev_p = PAGES[i - 1] if i > 0 else None
    next_p = PAGES[i + 1] if i < len(PAGES) - 1 else None
    pager = '<div class="legal-pager">%s%s</div>' % (
        ('<a href="%s.html" class="prev"><span class="arr">←</span> <span data-i18n="l.%s.name">%s</span></a>' % (prev_p['slug'], prev_p['slug'], esc(prev_p['en_name']))) if prev_p else '<span></span>',
        ('<a href="%s.html" class="next"><span data-i18n="l.%s.name">%s</span> <span class="arr">→</span></a>' % (next_p['slug'], next_p['slug'], esc(next_p['en_name']))) if next_p else '<span></span>')

    page = f'''<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title data-i18n="{pre}.meta">{esc(p['en_name'])} — youcloud UAE</title>
  <meta name="description" content="{esc(p['en_sum'][:155])}">
  <link rel="icon" type="image/png" href="assets/favicon.png?v=202610141205">
  <link rel="apple-touch-icon" href="assets/apple-touch-icon.png?v=202610141205">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;700&family=Noto+Kufi+Arabic:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css?v=202610141205">
</head>
<body data-page="{s}">
  <div id="site-nav"></div>

  <main class="page-fade">
    <section class="page-hero legal-hero" id="top">
      <div class="container">
        <span class="eyebrow reveal"><span data-i18n="l.eyebrow">Legal</span> · {p['num']} · <span data-i18n="{pre}.name">{esc(p['en_name'])}</span></span>
        <h1 class="display legal-title reveal" data-i18n="{pre}.title">{esc(p['en_title'])}</h1>
        <p class="legal-meta reveal" data-i18n="l.meta">{esc(COMMON['l.meta'][0])}</p>
        <nav class="legal-tabs reveal" aria-label="Legal pages">{tabs}</nav>
      </div>
    </section>

    <section class="section legal-body" style="padding-top:48px">
      <div class="container legal-grid">
        <aside class="legal-toc">
          <span data-i18n="l.onpage">On this page</span>
          <ul>{''.join(toc)}</ul>
        </aside>
        <article class="legal-article">
          <div class="legal-summary reveal">
            <span class="tag" data-i18n="l.oneline">In one line</span>
            <p data-i18n="{pre}.sum">{esc(p['en_sum'])}</p>
          </div>
          {chr(10).join(body)}
          {contact}
          {pager}
          <a class="legal-top" href="#top"><span aria-hidden="true">↑</span> <span data-i18n="l.top">Back to top</span></a>
        </article>
      </div>
    </section>

    <section class="section legal-cta">
      <div class="container legal-cta-inner reveal zoom">
        <div>
          <span class="tag" data-i18n="l.q.k">Still have questions?</span>
          <h2 data-i18n="l.q.h">Talk to our UAE team.</h2>
          <p data-i18n="l.q.p">{esc(COMMON['l.q.p'][0])}</p>
        </div>
        <div class="btn-row">
          <a class="btn btn-white" href="mailto:dpo@youcloud.ae" data-i18n="l.q.email">Email dpo@youcloud.ae</a>
          <button class="btn btn-outline-white" data-demo data-i18n="l.q.demo">Book a 15-min demo</button>
        </div>
      </div>
    </section>
  </main>

  <div id="site-footer"></div>

  <script src="js/i18n.js?v=202610141205"></script>
  <script src="js/i18n-legal.js?v=202610141205"></script>
  <script src="js/main.js?v=202610141205"></script>
  <script src="js/demo-form.js?v=202610141205"></script>
  <script src="js/chatbot.js?v=202610141205"></script>
</body>
</html>
'''
    open(ROOT + s + '.html', 'w').write(page)

js = '/* Arabic strings for the legal pages (generated). */\nObject.assign(window.YC_AR || (window.YC_AR = {}), ' + json.dumps(ar, ensure_ascii=False, indent=2) + ');\n'
open(ROOT + 'js/i18n-legal.js', 'w').write(js)
print('pages', len(PAGES), 'ar keys', len(ar))
