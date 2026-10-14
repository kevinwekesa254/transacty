/* youcloud UAE — shared behaviour: nav, footer, language, motion, demo modal */
(function () {
  'use strict';

  var CONFIG = {
    // Set the UAE WhatsApp Business number in international format, digits only (e.g. 9715XXXXXXXX).
    // While empty, "WhatsApp us" links fall back to emailing support.
    whatsappNumber: '',
    email: 'sales@youcloud.ae',
    supportEmail: 'support@youcloud.ae',
  };
  window.YC_CONFIG = CONFIG;

  var page = document.body.getAttribute('data-page') || 'home';
  var onHome = page === 'home';
  var home = onHome ? '' : 'index.html';
  var AR = window.YC_AR || {};

  function waHref(text) {
    if (CONFIG.whatsappNumber) {
      return 'https://wa.me/' + CONFIG.whatsappNumber + (text ? '?text=' + encodeURIComponent(text) : '');
    }
    return 'mailto:' + CONFIG.supportEmail + '?subject=' + encodeURIComponent(text || 'Hello youcloud');
  }
  window.YC_waHref = waHref;

  /* ---------- Nav ---------- */
  var navLinks = [
    ['nav.how', 'How it works', home + '#how', 'how'],
    ['nav.sol', 'Solutions', 'solutions.html', 'solutions'],
    ['nav.hw', 'Hardware', home + '#hardware', 'hardware'],
    ['nav.pr', 'Pricing', home + '#pricing', 'pricing'],
    ['nav.ent', 'Enterprise', 'enterprise.html', 'enterprise']
  ];
  function linksHtml(cls) {
    return navLinks.map(function (l) {
      var active = (l[3] === page) ? ' active' : '';
      return '<a class="' + cls + active + '" href="' + l[2] + '" data-key="' + l[3] + '" data-i18n="' + l[0] + '">' + l[1] + '</a>';
    }).join('');
  }
  var navEl = document.getElementById('site-nav');
  if (navEl) {
    navEl.outerHTML =
      '<header class="nav' + (onHome ? '' : ' bordered') + '" id="nav">' +
        '<div class="container nav-inner">' +
          '<a class="brand" href="' + (onHome ? '#top' : 'index.html') + '" aria-label="youcloud home"><img src="assets/logo-hd.png?v=202610141205" alt="youcloud" width="225" height="35"></a>' +
          '<nav class="nav-links" aria-label="Main">' + linksHtml('') + '</nav>' +
          '<div class="nav-actions">' +
            '<div class="lang" role="group" aria-label="Language">' +
              '<span class="pill" aria-hidden="true"></span>' +
              '<button type="button" data-lang="en" aria-pressed="true">EN</button>' +
              '<button type="button" data-lang="ar" aria-pressed="false" lang="ar">العربية</button>' +
            '</div>' +
            '<button class="btn btn-primary" data-demo data-i18n="c.bookdemo">Book a demo</button>' +
            '<button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>' +
          '</div>' +
        '</div>' +
        '<div class="mobile-menu" id="mobile-menu">' + linksHtml('m-link') +
          '<button class="btn btn-primary" data-demo data-i18n="c.bookdemo">Book a demo</button>' +
        '</div>' +
      '</header>';
  }

  /* ---------- Footer ---------- */
  var footEl = document.getElementById('site-footer');
  if (footEl) {
    footEl.outerHTML =
      '<footer class="footer">' +
        '<div class="container">' +
          '<div class="footer-grid">' +
            '<div class="footer-brand">' +
              '<img src="assets/logo-white.png?v=202610141205" alt="youcloud" width="225" height="35" loading="lazy">' +
              '<p data-i18n="f.about">One app for all your business headache. POS, payments, HR, books, marketing and AI — for UAE retailers, restaurants and chains.</p>' +
              '<div class="chips"><span data-i18n="f.c1">Under CB UAE license</span><span>PCI DSS L1</span><span data-i18n="f.c3">FTA e-invoice</span><span>EMV L1+L2</span></div>' +
            '</div>' +
            '<div><h5 data-i18n="f.h1">Platform</h5><ul>' +
              '<li><a href="' + home + '#how" data-i18n="nav.how">How it works</a></li>' +
              '<li><a href="' + home + '#hardware" data-i18n="nav.hw">Hardware</a></li>' +
              '<li><a href="' + home + '#pricing" data-i18n="nav.pr">Pricing</a></li>' +
              '<li><a href="' + home + '#compare" data-i18n="f.compare">Compare</a></li>' +
              '<li><a href="enterprise.html" data-i18n="nav.ent">Enterprise</a></li>' +
            '</ul></div>' +
            '<div><h5 data-i18n="f.h2">For merchants</h5><ul>' +
              '<li><a href="' + home + '#retail" data-i18n="f.retail">Retail shops</a></li>' +
              '<li><a href="' + home + '#restaurants" data-i18n="f.rest">Restaurants &amp; cafes</a></li>' +
              '<li><a href="' + home + '#salons" data-i18n="f.salon">Salon &amp; services</a></li>' +
              '<li><a href="' + home + '#chains" data-i18n="f.chains">Chains &amp; franchises</a></li>' +
              '<li><a href="#" data-demo data-i18n="c.bookdemo">Book a demo</a></li>' +
            '</ul></div>' +
            '<div><h5 data-i18n="f.h3">Support</h5><ul>' +
              '<li><a href="mailto:' + CONFIG.email + '">' + CONFIG.email + '</a></li>' +
              '<li><a href="mailto:' + CONFIG.supportEmail + '">' + CONFIG.supportEmail + '</a></li>' +
            '</ul></div>' +
            '<div><h5 data-i18n="f.legal">Legal</h5><ul>' +
              '<li><a href="privacy.html" data-i18n="f.privacy">Privacy</a></li>' +
              '<li><a href="terms.html" data-i18n="f.terms">Terms of Use</a></li>' +
              '<li><a href="cookies.html" data-i18n="f.cookies">Cookies</a></li>' +
              '<li><a href="disclaimer.html" data-i18n="f.disclaimer">Disclaimer</a></li>' +
            '</ul></div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<span data-i18n="f.copy">© 2026 youcloud · Dubai, UAE · All rights reserved</span>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  /* ---------- Demo form ---------- */
  // The lead form lives in js/demo-form.js and registers window.YC_openDemo.
  function openModal(device) { if (window.YC_openDemo) window.YC_openDemo(device); }

  /* ---------- Language ---------- */
  var LANG_KEY = 'yc-lang';
  function getLang() {
    try { return localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { return 'en'; }
  }
  function positionPill() {
    var wrap = document.querySelector('.lang');
    if (!wrap) return;
    var on = wrap.querySelector('button.on');
    var pill = wrap.querySelector('.pill');
    if (!on || !pill) return;
    pill.style.left = on.offsetLeft + 'px';
    pill.style.width = on.offsetWidth + 'px';
  }
  // Keep Latin terms such as "T+2" in reading order inside right-to-left text (left-to-right isolate).
  function ltrTerms(s) { return String(s).replace(/T\+(\d)/g, '\u2066T+$1\u2069'); }
  window.YC_ltrTerms = ltrTerms;
  function applyLang(lang, animate) {
    var isAr = lang === 'ar';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (!el.hasAttribute('data-en')) el.setAttribute('data-en', el.innerHTML);
      var key = el.getAttribute('data-i18n');
      if (isAr) {
        if (AR[key] != null) el.innerHTML = ltrTerms(AR[key]);
      } else {
        el.innerHTML = el.getAttribute('data-en');
      }
    });
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.querySelectorAll('.lang button').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage blocked */ }
    requestAnimationFrame(positionPill);
    if (animate) {
      document.body.classList.remove('lang-swap');
      void document.body.offsetWidth;
      document.body.classList.add('lang-swap');
    }
    document.dispatchEvent(new CustomEvent('yc:lang', { detail: { lang: lang } }));
  }
  window.YC_lang = function () { return document.documentElement.lang === 'ar' ? 'ar' : 'en'; };
  window.YC_applyLang = applyLang;

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang button');
    if (b) { applyLang(b.getAttribute('data-lang'), true); return; }
    var s = e.target.closest('[data-set-lang]');
    if (s) { e.preventDefault(); applyLang(window.YC_lang() === 'ar' ? 'en' : 'ar', true); }
  });

  /* ---------- WhatsApp + demo triggers ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waHref('Hi youcloud, I would like to know more.');
    if (!CONFIG.whatsappNumber) a.removeAttribute('target');
  });
  document.addEventListener('click', function (e) {
    var d = e.target.closest('[data-demo]');
    if (d) { e.preventDefault(); closeMenu(); openModal(d.getAttribute('data-device')); }
  });

  /* ---------- Sticky nav state + mobile menu ---------- */
  var nav = document.getElementById('nav');
  var burger = nav && nav.querySelector('.burger');
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  if (burger) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.m-link').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      if (nav) nav.classList.toggle('scrolled', y > 10);
      var tabs = document.querySelector('.sol-tabs');
      if (tabs) tabs.classList.toggle('stuck', tabs.getBoundingClientRect().top <= 82);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', positionPill);
  onScroll();

  /* ---------- Scroll spy (home nav, solutions tabs) ---------- */
  if ('IntersectionObserver' in window) {
    var spyTargets = [];
    if (onHome) {
      ['how', 'hardware', 'pricing'].forEach(function (id) {
        var s = document.getElementById(id);
        if (s) spyTargets.push(s);
      });
    }
    var tabLinks = document.querySelectorAll('.sol-tabs a, .legal-toc a');
    tabLinks.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) spyTargets.push(s);
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        if (onHome) {
          document.querySelectorAll('.nav-links a, .m-link').forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('data-key') === id);
          });
        }
        tabLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + id;
          a.classList.toggle('active', on);
          if (on && a.parentNode.scrollWidth > a.parentNode.clientWidth) {
            a.parentNode.scrollTo({ left: a.offsetLeft - 24, behavior: 'smooth' });
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyTargets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- Trust band marquee (duplicated for a seamless loop on small screens) ---------- */
  document.querySelectorAll('.band-track').forEach(function (track) {
    var items = Array.prototype.slice.call(track.children);
    items.forEach(function (it) {
      var c = it.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      c.classList.add('band-dup');
      track.appendChild(c);
    });
  });
  // On wide screens the band shows its items once. If they don't fit (long Arabic, narrow window),
  // switch that band to the scrolling loop instead of clipping the text.
  function fitBands() {
    document.querySelectorAll('.band').forEach(function (band) {
      var track = band.querySelector('.band-track');
      if (!track) return;
      track.classList.remove('marquee');
      var need = 0;
      Array.prototype.forEach.call(track.children, function (c) {
        if (!c.classList.contains('band-dup')) need += c.getBoundingClientRect().width + 32;
      });
      track.classList.toggle('marquee', need > band.getBoundingClientRect().width - 16);
    });
  }
  window.addEventListener('resize', fitBands);
  document.addEventListener('yc:lang', function () { requestAnimationFrame(fitBands); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBands);
  window.addEventListener('load', fitBands);

  /* ---------- Pricing: Retail / F&B toggle ---------- */
  var segWrap = document.querySelector('.seg-toggle');
  function placeSegPill() {
    if (!segWrap) return;
    var on = segWrap.querySelector('button.on'), pill = segWrap.querySelector('.pill');
    if (on && pill) { pill.style.left = on.offsetLeft + 'px'; pill.style.width = on.offsetWidth + 'px'; }
  }
  function setSeg(id, focus) {
    if (!segWrap) return;
    segWrap.querySelectorAll('button[data-seg]').forEach(function (b) {
      var on = b.getAttribute('data-seg') === id;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
      var panel = document.getElementById('plans-' + b.getAttribute('data-seg'));
      if (panel) {
        panel.hidden = !on;
        if (on) { panel.classList.remove('seg-in'); void panel.offsetWidth; panel.classList.add('seg-in'); panel.querySelectorAll('.reveal').forEach(function (r) { r.classList.add('in'); }); }
      }
    });
    placeSegPill();
    try { localStorage.setItem('yc-seg', id); } catch (e) { /* storage blocked */ }
  }
  if (segWrap) {
    var segs = [].slice.call(segWrap.querySelectorAll('button[data-seg]'));
    segs.forEach(function (b, i) {
      b.addEventListener('click', function () { setSeg(b.getAttribute('data-seg')); });
      b.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        var rtl = document.documentElement.dir === 'rtl', dir = (e.key === 'ArrowRight') !== rtl ? 1 : -1;
        setSeg(segs[(i + dir + segs.length) % segs.length].getAttribute('data-seg'), true);
      });
    });
    var startSeg = /fnb|restaurant|f&b/i.test(location.hash) ? 'fnb' : /self/i.test(location.hash) ? 'self' : null;
    if (!startSeg) { try { startSeg = localStorage.getItem('yc-seg'); } catch (e) { startSeg = null; } }
    setSeg(startSeg && document.getElementById('plans-' + startSeg) ? startSeg : segs[0].getAttribute('data-seg'));
    window.addEventListener('resize', placeSegPill);
    document.addEventListener('click', function (e) {
      var l = e.target.closest('a[href^="#pricing-"]');
      if (!l) return;
      var id = l.getAttribute('href').replace('#pricing-', '');
      if (!document.getElementById('plans-' + id)) return;
      e.preventDefault();
      setSeg(id);
      document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeSegPill);
    document.addEventListener('yc:lang', function () { requestAnimationFrame(placeSegPill); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentNode;
      var open = !item.classList.contains('open');
      item.parentNode.querySelectorAll('.faq-item.open').forEach(function (o) {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); }
      });
      item.classList.toggle('open', open);
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------- Initial language (after all markup exists) ---------- */
  applyLang(getLang(), false);

  /* ---------- Reveal on scroll + counters ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function fmt(n, el) {
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var s = n.toFixed(dec);
    if (el.getAttribute('data-format') === 'comma') s = Number(s).toLocaleString('en-US');
    return s;
  }
  function count(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target) || reduce) return;
    var dur = 1400, start = null;
    var from = target > 99 && target < 100 ? 90 : 0;
    function step(t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (target - from) * e, el);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        count(en.target);
        cio.unobserve(en.target);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Page transitions ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https?:)/.test(href)) return;
    var url = new URL(href, location.href);
    if (url.pathname === location.pathname) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(function () { location.href = url.href; }, reduce ? 0 : 220);
  });
  window.addEventListener('pageshow', function () { document.body.classList.remove('leaving'); });
})();
