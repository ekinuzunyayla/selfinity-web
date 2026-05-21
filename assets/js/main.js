(function () {
  'use strict';

  // ─── 1. First-visit language detection (root only) ─────────
  var path = location.pathname;
  var isRoot = (path === '/' || /\/index\.html$/.test(path)) &&
               !/\/(tr|es|ja)\//.test(path);
  if (isRoot && !sessionStorage.getItem('lotus-lang-redirected')) {
    var stored = localStorage.getItem('lotus-lang');
    var nav = (stored || navigator.language || 'en').toLowerCase().slice(0, 2);
    sessionStorage.setItem('lotus-lang-redirected', '1');
    if (nav === 'tr') { location.replace('./tr/'); return; }
    if (nav === 'es') { location.replace('./es/'); return; }
    if (nav === 'ja') { location.replace('./ja/'); return; }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('.lang-switcher a');
    if (!a) return;
    var lang = a.getAttribute('data-lang');
    if (lang) localStorage.setItem('lotus-lang', lang);
  });

  // ─── 2. Fade-in on scroll ─────────────────────────────────
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  // ─── 3. Lightbox for theme tiles ──────────────────────────
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(function (tile) {
      tile.addEventListener('click', function () {
        var src = tile.getAttribute('data-lightbox');
        var alt = tile.getAttribute('data-alt') || '';
        lbImg.src = src;
        lbImg.alt = alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLb () {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      lbImg.removeAttribute('src');
    }
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lightbox-close')) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLb();
    });
  }

  // ─── 4. Wallpaper featured swap ───────────────────────────
  var featured = document.querySelector('.wallpaper-featured img');
  var thumbs = document.querySelectorAll('.wallpaper-thumb');
  if (featured && thumbs.length) {
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        var img = t.querySelector('img');
        if (!img) return;
        featured.style.opacity = '0';
        setTimeout(function () {
          featured.src = img.src;
          featured.alt = img.alt;
          featured.style.opacity = '1';
        }, 220);
        thumbs.forEach(function (x) { x.classList.remove('active'); });
        t.classList.add('active');
      });
    });
    thumbs[0].classList.add('active');
  }
})();
