// Animated PatternWaves background for the home page hero ([data-pattern-waves]).
// Uses the site's clay accent: darker "ink" marks on the light theme, lighter marks on the dark theme.
import { createPatternWaves } from './pattern-waves.js';

const el = document.querySelector('[data-pattern-waves]');
if (el) {
  const root = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => (root.getAttribute('data-theme') || (darkQuery.matches ? 'dark' : 'light')) === 'dark';
  const colorFor = () => (isDark() ? '#e8a68c' : '#c6613f');

  const waves = createPatternWaves(el, {
    preset: 'silk',
    introSeconds: 0.8,
    speed: 0.5,
    color: colorFor(),
    backgroundColor: 'transparent',
    opacity: 0.55,
    fade: 'edges',
    fadeSize: 0.6,
    interactive: true,
    cursorSize: 60,
    cursorStrength: 0.5
  });

  const syncTheme = () => waves.update({ color: colorFor() });
  new MutationObserver(syncTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  darkQuery.addEventListener('change', syncTheme);
}
