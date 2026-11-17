/* 藤村歯科クリニック 共通スクリプト */
(function () {
  // スマホメニュー
  var btn = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 写真の有無を確認し、無い枠だけを隠す
  //（ページURLの末尾に ?photos を付けると、写真を入れる場所を枠で確認できます）
  var showFrames = location.search.indexOf('photos') !== -1;
  document.querySelectorAll('.ph img').forEach(function (img) {
    var frame = img.closest('.ph');
    var probe = new Image();
    probe.onerror = function () {
      img.style.display = 'none';
      if (showFrames) return;
      frame.classList.add('is-missing');
      var parent = frame.parentElement;
      if (parent.classList.contains('feature') || parent.classList.contains('svc-layout')) parent.classList.add('no-photo');
      var item = frame.closest('.clinic-item');
      if (item) {
        item.classList.add('is-missing');
        var sec = item.closest('.clinic');
        if (sec && !sec.querySelector('.clinic-item:not(.is-missing)')) sec.classList.add('is-empty');
      }
    };
    probe.src = img.getAttribute('src');
  });

  // スクロールでふわっと表示
  var items = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { obs.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }
})();
