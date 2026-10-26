// Animated background for the home page hero ([data-hero-bg]). Two styles, picked with the
// [data-bg-set] buttons next to the theme toggle and remembered in localStorage:
//   lines  MagnetLines (default): warm grey lines that turn towards the cursor and glow clay near it
//   waves  PatternWaves: a lit silk surface of clay dots (loads ogl only when chosen)
// Both follow the light/dark theme.
import { createMagnetLines } from './magnet-lines.js';

const el = document.querySelector('[data-hero-bg]');
const buttons = document.querySelectorAll('[data-bg-set]');
const STORE = 'mantrana-hero-bg';
const STYLES = ['lines', 'waves'];

const root = document.documentElement;
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = () => (root.getAttribute('data-theme') || (darkQuery.matches ? 'dark' : 'light')) === 'dark';

const optionsFor = style => {
  const dark = isDark();
  if (style === 'waves') {
    return {
      preset: 'silk',
      introSeconds: 0.8,
      speed: 0.5,
      color: dark ? '#e8a68c' : '#c6613f',
      backgroundColor: 'transparent',
      opacity: 0.55,
      fade: 'edges',
      fadeSize: 0.6,
      cursorSize: 60,
      cursorStrength: 0.5
    };
  }
  return {
    lineColor: dark ? '#4d4c48' : '#cfccc1',
    accentColor: dark ? '#e8a68c' : '#c6613f',
    spacing: 30,
    lineWidth: 2,
    lineHeight: 18,
    mode: 'orbit',
    shape: 'line',
    radius: 220,
    fade: 0.55,
    edgeFade: 0.35,
    idle: true
  };
};

let current = null; // { style, instance }
let token = 0;

const mount = async style => {
  if (!el) return;
  const mine = ++token;
  current?.instance.destroy();
  current = null;
  const create = style === 'waves' ? (await import('./pattern-waves.js')).createPatternWaves : createMagnetLines;
  if (mine !== token) return; // a newer choice arrived while loading
  current = { style, instance: create(el, optionsFor(style)) };
};

const read = () => {
  try { const v = localStorage.getItem(STORE); return STYLES.includes(v) ? v : 'lines'; } catch (e) { return 'lines'; }
};

const choose = style => {
  buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.bgSet === style)));
  try { localStorage.setItem(STORE, style); } catch (e) {}
  if (current?.style !== style) mount(style);
};

buttons.forEach(b => b.addEventListener('click', () => choose(b.dataset.bgSet)));
choose(read());

const syncTheme = () => current && current.instance.update(optionsFor(current.style));
new MutationObserver(syncTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
darkQuery.addEventListener('change', syncTheme);
