# Mantrana Healthcare website

Static site for Mantrana Healthcare Technology Pvt. Ltd. — *Human Wisdom, Machine Intelligence*.
Built with Jekyll 4.4 and Tailwind CSS v4, served from Cloudflare Workers static assets
(the same setup as the SSSIHL–CADS portal).

## Edit the content

| What | Where |
| --- | --- |
| Hero line, partners, Vision/Collaboration/Opportunity, About, Founders, Internships, Contact | `_data/home.yml` |
| Header and footer links | `_data/nav.yml` |
| Company name, tagline, email, Apply form link | `_config.yml` |
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
mode on their own, so no `dark:` variants are needed. Fonts: `font-serif` (Source Serif 4) for
headings, `font-sans` (Inter) for text, `font-mono` (JetBrains Mono) for labels. Shared classes:
`label`, `btn`, `btn-primary`.

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

## Before public launch

The site is in preview and asks search engines not to index it. At launch set `noindex: false` in
`_config.yml`, allow crawling in `robots.txt`, and set `url:` to the live domain.
