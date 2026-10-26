// Site-wide GSAP animations. Declared in the markup:
//   data-intro          on a page's hero content: its children play in on load (h1 rises line by line)
//   data-reveal         one element fades up when it scrolls into view
//   data-stagger="0.08" its children fade up one after another (value = seconds between them)
//   data-count          a number counts up from 0 when it scrolls into view
// Section labels, h2 headings and the paragraph after them reveal on their own (AUTO below).
// The layout adds the "motion" class only when the visitor has not asked for reduced motion; the
// matching CSS hides these elements until GSAP shows them (_tailwind/site.css).
(function () {
  var root = document.documentElement;
  if (!root.classList.contains('motion')) return;
  if (!window.gsap || !window.ScrollTrigger) { root.classList.remove('motion'); return; }
  window.__motionReady = true;

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(window.SplitText);

  var EASE = 'power3.out';
  var START = 'top 92%';
  // Must match the selector in _tailwind/site.css, or matched elements would stay hidden.
  var AUTO = 'main > section ~ section :is(h2, h2 + p, .label):not([data-stagger] *):not(figure *):not([data-reveal] *)';

  // 1. Page intro, once the web fonts are in (so SplitText measures the real lines), or after 0.3 s at most
  var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 300); })]).then(playIntros);

  function playIntros() { document.querySelectorAll('[data-intro]').forEach(function (intro) {
    var tl = gsap.timeline({ defaults: { ease: EASE } });
    Array.prototype.forEach.call(intro.children, function (el, i) {
      if (el.tagName === 'H1' && window.SplitText) {
        var split = new window.SplitText(el, { type: 'lines', mask: 'lines', linesClass: 'motion-line' });
        gsap.set(el, { autoAlpha: 1 });
        tl.from(split.lines, { yPercent: 105, duration: 0.7, stagger: 0.08, onComplete: function () { split.revert(); } }, i === 0 ? 0 : '<0.04');
      } else {
        tl.fromTo(el, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5, clearProps: 'transform' }, i === 0 ? 0 : '<0.1');
      }
    });
  }); }

  // 2. Single reveals, including the automatic section headings
  var singles = new Set(document.querySelectorAll('[data-reveal]'));
  document.querySelectorAll(AUTO).forEach(function (el) { singles.add(el); });
  singles.forEach(function (el) {
    gsap.fromTo(el, { autoAlpha: 0, y: 26 }, {
      autoAlpha: 1, y: 0, duration: 0.6, ease: EASE, clearProps: 'transform',
      scrollTrigger: { trigger: el, start: START, once: true }
    });
  });

  // 3. Staggered groups
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    var gap = parseFloat(group.getAttribute('data-stagger')) || 0.08;
    gsap.fromTo(group.children, { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1, y: 0, duration: 0.55, ease: EASE, stagger: gap * 0.75, clearProps: 'transform',
      scrollTrigger: { trigger: group, start: START, once: true }
    });
  });

  // 4. Count-ups
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var end = parseFloat(el.textContent) || 0;
    var counter = { value: 0 };
    el.textContent = '0';
    gsap.to(counter, {
      value: end, duration: 1, ease: 'power2.out',
      onUpdate: function () { el.textContent = Math.round(counter.value); },
      scrollTrigger: { trigger: el, start: START, once: true }
    });
  });

  // Images and fonts change the page height after load; re-measure the trigger points.
  window.addEventListener('load', function () { window.ScrollTrigger.refresh(); });
})();
