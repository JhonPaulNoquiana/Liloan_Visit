# Liloan Visit

A static tourism website for Liloan, Cebu, built with HTML, CSS, and JavaScript.

## Project structure

```text
index.html                 Main entry point (formerly pre.html)
pages/
  landing.html             Original video introduction
  attractions/             Attraction listings and destination details
  culture/                 Food and culture page
  events/                  Events and festivals page
assets/
  css/                     Page and shared stylesheets
  js/                      Navigation, animations, and gallery scripts
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

Open http://localhost:8000/. The original introduction remains available at
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
Google Fonts, GSAP, and embedded Google Maps require an internet connection.
