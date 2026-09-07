# Nazzas Ibn Shams Unib — Portfolio

React + Vite rebuild of the original single-file `index.html`, with a new
visual identity and per-section motion. All copy, links and data from the
original page were carried over.

The original file is preserved untouched at `legacy/index.original.html`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Design system

A single palette drives everything, defined as tokens in
[src/styles/global.css](src/styles/global.css):

| Token | Value | Role |
| --- | --- | --- |
| `--ink` / `--ink-2` / `--ink-3` | `#08070f` → `#16132b` | ink-plum ground |
| `--saffron` | `#ffb020` | primary accent |
| `--vermilion` | `#ff5c39` | secondary accent |
| `--jade` | `#23d3b0` | cool counterpoint |
| `--iris` | `#8a6bff` | tertiary accent |
| `--rose` | `#ff7db0` | events accent |
| `--chalk` / `--ash` | `#f5f2ea` / `#948da8` | text, muted text |

The idea is a dye-lot against an indigo vat: warm saffron/vermilion carrying
the brand, jade and iris cooling it, all on near-black plum. Type is
Bricolage Grotesque (display), Inter (body), JetBrains Mono (labels).

## Structure

```
index.html              Vite entry
src/
  main.jsx              global.css imported BEFORE App (cascade order matters)
  App.jsx               section order, Lenis smooth scroll, preloader gate
  data/content.js       ALL copy, links, skills, events — edit here
  lib/scroll.js         single scroll authority (Lenis-aware)
  hooks/index.js        typewriter, count-up, tilt, active-section, scroll lock
  styles/global.css     tokens, base, buttons
  components/
    ui/Primitives.jsx   Section, SectionHead, SplitWords, GradientLine, …
    ui/Icon.jsx         one inline SVG icon set (no icon library)
    Ambient.jsx         cursor, floating glyphs, scroll progress, back-to-top
    Preloader.jsx  Navbar.jsx  Hero.jsx  About.jsx  Skills.jsx
    Experience.jsx  Projects.jsx  GitHubPanel.jsx  Expertise.jsx
    Events.jsx  Certificates.jsx  Social.jsx  Contact.jsx  Footer.jsx
```

## Motion, by section

| Section | Treatment |
| --- | --- |
| Preloader | loom warp/weft threads draw in, progress counter, clip-path wipe out |
| Hero | per-character name reveal, typewriter role, conic portrait ring + orbit, scroll parallax & fade, keyword marquee |
| Nav | blur-in on scroll, spring-sliding active pill (`layoutId`), circular-reveal mobile menu |
| About | per-word title masks, count-up stats, scroll-linked education rail fill |
| Skills | domain constellation wired to a hub, filter chips with spring pill, hover/focus/click drives a readout panel; no proficiency ratings by design |
| Experience | scroll-linked centre spine, cards slide in from alternating sides |
| Projects | staggered entry, 3D tilt, spotlight, grid drift on hover |
| GitHub | count-up stats, language bars spring open, shimmer skeleton while loading |
| Business / Textile | dye-band swatch panels, scroll-drifting glyph, SVG stitch draws in, staggered feature cards |
| Events | hover zoom → spring modal with swipeable slideshow + autoplay |
| Certificates | native scroll-snap carousel with pointer drag and edge fades |
| Social | per-brand hover glow keyed to each platform's colour |
| Contact | floating labels, gradient underline sweep, copy-to-clipboard, themed map |
| Footer | outlined keyword marquee, wave divider |

Everything is gated behind `prefers-reduced-motion`, which also disables
Lenis so native scrolling is untouched.

## Deploying

Hosted on GitHub Pages at **https://nazzasunib.github.io** via
[.github/workflows/deploy.yml](.github/workflows/deploy.yml). Every push to
`main` builds the site and publishes `dist/` — the repository stores source
only, never build output (`dist/` is gitignored).

One-time setup in the repository, under **Settings → Pages**: set
**Source** to **GitHub Actions**. Without that the workflow builds but has
nowhere to publish.

To deploy: commit and push to `main`. Progress is visible in the **Actions**
tab; a run takes roughly a minute. **Actions → Deploy to GitHub Pages →
Run workflow** re-deploys without a new commit.

`vite.config.js` sets `base: './'`, so assets resolve relatively. That works
both at the domain root (a `<user>.github.io` repo) and under a subpath, so
the same build survives being moved to a project page.

## Editing content

Everything user-facing lives in [src/data/content.js](src/data/content.js) —
profile, nav, about copy, education, skills, experience, business/textile
feature lists, events (including the full GUB 2026 article), certificates and
social links. No copy is hardcoded in components.

### Assets to add

Neither of these is in the repository yet, so both are missing on the live
site until added:

- `public/assets/Nazzas_Ibn_Shams_Unib_Resume.pdf` — the hero’s "Download
  Resume" button 404s without it. Path is set by `PROFILE.resume`.
- `public/GUB 2026/1.JPG` … `6.JPG` — the event photos (create the folder;
  the space in the name is intentional and handled). Until they exist the
  gallery renders a woven placeholder tile instead of breaking the layout.

Anything in `public/` is copied to the site root as-is and is publicly
reachable, so keep private files out of it.

## Notes on two non-obvious fixes

Both were real rendering bugs found while verifying in a browser, and the
patterns are worth keeping in mind when adding sections:

1. **Split text + `whileInView`.** A word parked inside an
   `overflow: hidden` mask is clipped to zero area, so an
   IntersectionObserver on the *word* never fires and the text stays hidden
   forever. `SplitWords` therefore observes the unclipped wrapper and drives
   the words with variant propagation.
2. **Split text + gradients.** `background-clip: text` clips to a box's own
   text runs. Splitting text into descendant spans leaves the gradient box
   with no text to clip to, so nothing paints. Gradient phrases use
   `GradientLine`, which keeps the glyphs in the gradient element itself.

`.sec` uses `overflow-x: clip` (with an `overflow-clip-margin`) so the
decorative section blooms never widen the document box.

## Third-party

- `framer-motion` — all animation
- `lenis` — inertial smooth scroll
- Live GitHub stats via the public API, with a static fallback in
  `FALLBACK_PROJECTS` when offline or rate-limited.

Icons are hand-rolled inline SVG in `ui/Icon.jsx` — no icon package, and no
external scripts at runtime beyond Google Fonts and the contact map embed.
