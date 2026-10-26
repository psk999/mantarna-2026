(function () {
  /* mobile menu */
  var bar = document.querySelector('.topbar'), mbtn = document.querySelector('.menu-btn');
  if (bar && mbtn) {
    var setMenu = function (open) {
      bar.classList.toggle('open', open);
      mbtn.setAttribute('aria-expanded', String(open));
      mbtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    mbtn.addEventListener('click', function () { setMenu(!bar.classList.contains('open')); });
    document.querySelectorAll('#navPanel a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && bar.classList.contains('open')) { setMenu(false); mbtn.focus(); } });
    document.addEventListener('click', function (e) { if (bar.classList.contains('open') && !bar.contains(e.target)) setMenu(false); });
    window.matchMedia('(min-width: 1280px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  /* theme toggle: follows the device until the viewer chooses */
  var root = document.documentElement, btns = document.querySelectorAll('.theme button');
  function current() { return root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
  function sync() {
    var c = current();
    btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.set === c)); });
    if (window.syncFavicon) window.syncFavicon();
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', sync);
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      root.setAttribute('data-theme', b.dataset.set);
      try { localStorage.setItem('mantrana-theme', b.dataset.set); } catch (e) {}
      sync();
    });
  });
  sync();
})();
