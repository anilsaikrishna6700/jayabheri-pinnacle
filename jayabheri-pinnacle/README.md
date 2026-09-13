# Jayabheri Pinnacle

A modern, premium, single-page real-estate landing page built for a technical interview
assignment. The site presents a fictional luxury residential project — **Jayabheri
Pinnacle** — with a full marketing narrative from hero to enquiry form.

## Project Overview

Jayabheri Pinnacle is a one-page luxury real-estate landing page designed to feel
architectural, restrained and premium rather than templated. It is built with plain
HTML5, CSS3 and vanilla JavaScript (no framework, no build step), and is ready to run
by simply opening `index.html` or serving it with a local dev server such as VS Code's
Live Server.

## Features

- Elegant preloader with brand reveal
- Sticky navigation that transforms on scroll, with an active-link indicator and a
  fully animated mobile hamburger menu
- Full-screen hero with background zoom, staggered text reveal and a scroll indicator
- Project introduction section with an overlapping image composition and animated
  statistic counters
- Six-card project highlights grid with hover elevation and icon animation
- Cinematic full-bleed "architecture statement" section with parallax
- Interactive amenities grid with a vanilla-JS category filter (All / Wellness /
  Leisure / Sports / Convenience)
- Split-screen "residence experience" section
- Masonry-style gallery with a fully keyboard-accessible lightbox (next / previous /
  close / Escape / click-outside-to-close, background scroll locked while open)
- Location section with connectivity cards and a stylised map placeholder ready to be
  swapped for a real Google Maps embed
- Emotional, full-width "lifestyle" section with parallax
- Enquiry form with real-time client-side validation, friendly inline error messages
  and a simulated submission flow ending in a success modal
- Footer with quick links, contact placeholders and social icons
- Scroll progress bar and back-to-top button
- Scroll-triggered reveal animations via `IntersectionObserver`, with full support for
  `prefers-reduced-motion`
- Fully responsive layout, tested down to 375px

## Technologies Used

- **HTML5** — semantic markup, single primary `<h1>`, Open Graph & meta tags
- **CSS3** — custom properties (design tokens), CSS Grid & Flexbox, no CSS framework
- **Vanilla JavaScript** — modular, function-based `script.js`, no frameworks
- **Google Fonts** — Cormorant Garamond (display) + Manrope (body)
- **Lucide Icons** — lightweight icon set loaded via CDN

No React, Vue, Angular, jQuery or bundlers are used.

## Project Structure

```
jayabheri-pinnacle/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   ├── images/     (reserved for local image replacements)
│   ├── icons/      (reserved for local icon assets)
│   └── fonts/      (reserved for self-hosted font files)
│
└── favicon/
    └── favicon.svg
```

> Imagery is currently loaded from remote Unsplash URLs for development convenience.
> The `assets/images` folder is structured and ready to receive local, licensed
> photography — simply update the `src` attributes in `index.html`.

## How to Run

1. Open the `jayabheri-pinnacle` folder in VS Code.
2. Right-click `index.html` and choose **Open with Live Server** (or open the file
   directly in a browser).
3. The website will run locally — no build step, no dependencies to install.

## Browser Support

Tested against current versions of Chrome, Firefox, Edge and Safari. Uses standard
CSS Grid, Flexbox, `IntersectionObserver` and CSS custom properties, all of which are
broadly supported in modern evergreen browsers.

## Future Improvements

- **Backend integration:** The enquiry form currently simulates a successful
  submission on the frontend. See the `handleFormSubmit` function in `js/script.js`
  for the exact spot to swap in a real `fetch()` call to a backend or CRM endpoint.
- **Map integration:** The location section includes a stylised placeholder in place
  of a live map. The relevant markup is commented in `index.html` (`.location__map`)
  and can be replaced with a Google Maps embed or JS API integration once an API key
  is available.
- **Local imagery:** Replace the remote Unsplash placeholders with licensed,
  project-specific photography stored in `assets/images/`.
- **CMS-driven content:** Highlight, amenity and gallery content could be moved into
  a small JSON/config file to make future content updates easier.
