# Mantrana Healthcare website

Static site for Mantrana Healthcare Technology Pvt. Ltd. — *Human Wisdom, Machine Intelligence*.
Built with Jekyll 4.4 and Tailwind CSS v4, served at https://mantranatech.ai from Cloudflare Workers static assets
(the same setup as the SSSIHL–CADS portal).

## Edit the content

| What | Where |
| --- | --- |
| Hero line, partners, Vision/Collaboration/Opportunity, About, Internships, Contact text | `_data/home.yml` |
| Header links (also the footer's Explore column) | `_data/nav.yml` |
| Footer call to action and link columns | `_data/footer.yml` |
| Company name, tagline, Apply form link | `_config.yml` |
| Founder profiles, contact emails, the satellites-to-slides story | `_data/founders.yml` |
| About page (story, approach, innovation cycle) | `_data/about.yml` |
| Platform page and diagram | `_data/platform.yml` |
| Research page (applications in development, hospital AI projects) | `_data/research.yml` |
| Social Welfare Analytics page (under Research) | `_data/social_welfare.yml` |
| Internships page (tracks, skill groups, 16 weeks, form guide) | `_data/internships.yml` |
| Page structure | `index.html`, `_layouts/default.html` |
| Colours, fonts, shared classes | `_tailwind/site.css` |
| Images | `assets/img/` |

## Run locally

Needs Ruby 3.3 (`.ruby-version`). No Node: Tailwind runs as its standalone binary, which
`bin/build-css` downloads into `bin/` on first use.

```bash
bundle install
bin/serve            # Tailwind watch + jekyll serve at http://localhost:4000
```

One-off build: `bin/build-css && bundle exec jekyll build && bash deploy/leak-scan.sh _site`.

## Styling

Tailwind utilities go straight in the HTML. The palette (ivory paper, warm grays, clay accent,
after anthropic.com and claude.com) is a set of CSS variables in `_tailwind/site.css`, exposed as
Tailwind colours: `bg-paper`, `bg-surface`, `bg-surface-2`, `text-ink`, `text-body`, `text-muted`,
`text-faint`, `border-line`, `border-line-strong`, `text-clay`, `bg-clay-soft`. They switch for dark
mode on their own, so no `dark:` variants are needed. The site opens in light mode for every visitor; the
toggle in the header switches to dark and is remembered per visitor. Fonts: `font-serif` (Source Serif 4) for
headings, `font-sans` (Inter) for text, `font-mono` (JetBrains Mono) for labels. Shared classes:
`label`, `btn`, `btn-primary`.

## Hero background and animations

- **Hero background** (home page): two WebGL styles ported from React Bits, picked with the buttons left of
  the theme toggle and remembered per visitor: **Lines** (`assets/js/magnet-lines.js`, default) and
  **Waves** (`assets/js/pattern-waves.js`, loads `ogl` only when chosen). Settings: `assets/js/hero-background.js`.
- **Footer background:** the React Bits Aurora effect in the logo's lavender and the site's clay (`assets/js/footer-aurora.js`,
  raw WebGL2, no extra download). It starts when the footer scrolls into view, renders at half resolution and stops
  off screen; reduced-motion visitors get a still frame, and browsers without WebGL2 see a CSS glow.
- **Animations:** GSAP 3.13 with ScrollTrigger and SplitText (`assets/js/motion.js`). Mark elements with
  `data-intro`, `data-reveal`, `data-stagger="0.08"` or `data-count`. Reduced-motion visitors see no animation.

## Icons

[Lucide](https://lucide.dev/icons) icons are inline SVG includes (no JavaScript):

```bash
bin/add-icon heart-pulse stethoscope
```

```liquid
{% include icon.html name="heart-pulse" %}
{% include icon.html name="heart-pulse" class="text-clay text-2xl" %}
```

Icons take the text colour and size of their parent. Lucide is ISC licensed (`_includes/icons/LICENSE-lucide.txt`).

## Deploy

GitHub Actions (`.github/workflows/`):

- **PR to `main` or `qa`:** builds and runs the leak scan.
- **Push to `main`:** builds, scans, and deploys to production (`wrangler deploy`).
- **Push to `qa`:** uploads a preview version with the alias `qa`.

The upload steps run once the repository has the secrets `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` and the variable `CF_DEPLOY=true`. Until then the workflow builds and scans only.
Worker config: `wrangler.jsonc`.

`deploy/leak-scan.sh` blocks a deploy if the built site contains documents (PDF, PPTX, DOCX) or
wording from the internal company deck (confidential markings, commercial plans).

## Search, sharing and AI assistants

- **Share previews** (WhatsApp, LinkedIn, X, Slack): `assets/img/og-mantrana.jpg`, a 1200×630 card with the
  logo, company name and tagline. Titles and descriptions come from each page's front matter.
- **Search (SEO):** canonical links, `sitemap.xml`, `robots.txt`, and schema.org structured data
  (Organization, WebSite, page, breadcrumbs, founders as Person) from `_includes/seo.html`.
- **Answer engines (AEO):** the About page FAQ (`faq:` in `_data/about.yml`) is also published as FAQPage data.
- **AI assistants (GEO):** `llms.txt` summarises the site for language models; `robots.txt` allows the AI
  crawlers once indexing is on.
- Settings live under `seo:` and `url:` in `_config.yml`.

## Domain

The site is live at https://mantranatech.ai (DNS on Cloudflare, registered at GoDaddy). `wrangler.jsonc`
attaches `mantranatech.ai` and `www.mantranatech.ai` to the Worker as custom domains and turns off the
`workers.dev` address. All canonical links, share previews, the sitemap, structured data and `llms.txt`
take the domain from `url:` in `_config.yml`. `noindex: true` there puts the site back in preview: every
page asks search engines not to index it and `robots.txt` blocks crawlers.
