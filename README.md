# Liloan Visit

A static tourism website for Liloan, Cebu, built with HTML, CSS, and JavaScript.

## Project structure

```text
index.html                 Main entry point (formerly pre.html)
pages/
  landing.html             Alternate landing-page route
  attractions/             Attraction listings and destination details
  culture/                 Food and culture page
  events/                  Events and festivals page
assets/
  css/site.css             Shared responsive design system
  js/site.js               Menus, filters, galleries, video, and saved places
  images/                  Photos, logos, and seals
  videos/                  Background video
scripts/
  check_links.py           Local route and asset validation
```

## Local preview

From the repository root, run:

```sh
python -m http.server 8000
```

Open http://localhost:8000/. The same landing experience is also available at
http://localhost:8000/pages/landing.html.

## Routing and validation

Home links point to `index.html`, About links to `index.html#about-details`, and
Contact links to `index.html#contact`. Pages and assets use relative URLs so the
site also works within a GitHub Pages repository subdirectory.

After adding or moving files, validate links and asset paths:

```sh
python scripts/check_links.py
```

For GitHub Pages, serve the repository root so `index.html` is the default page.
Google Fonts and embedded Google Maps require an internet connection.

## Design and interactions

All 18 pages share `assets/css/site.css` and `assets/js/site.js`. The design uses
coastal green, warm sand, local photography, and responsive layouts. Edit the
HTML pages directly; no build step is required.

- The Explore directory filters all destinations by category and name.
- Destination pages include photo galleries, maps, and a save button.
- Saved places stay in the visitor?s browser and appear under Plan your visit.
- The landing-page film loads on demand and pauses when its dialog closes.
- Navigation, dialogs, and galleries support keyboard use; reduced motion
  preferences are respected.
