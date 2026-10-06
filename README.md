# ghostwoodlabs.com

The Ghostwood Labs LLC website. One static page, served by GitHub Pages from `main`.

- `index.html` — the page; the brand mark is inline SVG, the styles are inline. Two inline scripts: one line in the
  head sets `data-motion="reduce"` on `<html>` from the system's reduced-motion setting (the static caption layout is
  keyed off that attribute) or from `/?motion=reduce`, which previews it; the one at the foot lays out the static
  caption grid, hides the captions when the window is too short, and tells the grid the text block's height.
- `fonts/` — IBM Plex Mono Medium (Latin subset), SIL Open Font License 1.1, see the licence file beside it.
- `favicon.svg`, plus `favicon.ico` (16/32/48 px PNG-in-ICO, what browsers request by default), `favicon-32.png` and `apple-touch-icon.png`, and `og-image.png`, the 1200×630 social-preview card; all three PNGs are rendered from the mark.
- `robots.txt` (allow all, points at `sitemap.xml`, one URL — bump its `lastmod` when the page changes).
- `404.html` — the same page with a way back, served by Pages for unknown paths.
- `CNAME`.
