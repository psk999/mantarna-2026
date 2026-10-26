# Mantrana Healthcare website

Jekyll 4.4 + Tailwind CSS v4 (standalone CLI, no Node). See README.md for layout, commands and deploy.

- Words live in `_data/home.yml`; keep markup in `index.html` and `_layouts/default.html`.
- Use the palette classes from `_tailwind/site.css` (`bg-paper`, `text-ink`, `text-muted`, `border-line`, `text-clay`, ...), not raw Tailwind colours, so dark mode keeps working.
- Icons: Lucide via `bin/add-icon <name>` and `{% include icon.html name="<name>" %}`.
- Never commit or publish the company deck or anything from it beyond what is on the site: it is marked Private & Confidential. `deploy/leak-scan.sh` must pass.
- Check a change with `bin/build-css && bundle exec jekyll build && bash deploy/leak-scan.sh _site`.
