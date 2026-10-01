# Nazzas Ibn Shams Unib — Portfolio

React + Vite rebuild of the original single-file `index.html`, with a new
visual identity inspired by a dark/light SaaS look — two themes, canvas
and CSS-3D figures, and cursor-reactive effects. All copy, links and data from the
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

Two themes, one set of tokens in [src/styles/global.css](src/styles/global.css).
Dark is the default; `<html data-mode="light">` switches to light. The toggle
in the navbar saves the choice to `localStorage` (`nis-mode`), and a tiny
script in `index.html` applies it before first paint so there is no flash.

| Token | Dark | Light | Role |
| --- | --- | --- | --- |
| `--ground` | `#06070A` | `#F5F4F0` | page background |
| `--paper` | `#0C0E13` | `#FFFFFF` | solid card surface |
| `--ink` / `--ink2` / `--ink3` | `#F3F5F9` → `#9AA2B1` | `#101010` → `#66635D` | text, muted text |
| `--acc` | `#13EF93` neon green | `#D02F24` signal red | accent, links, live dots |
| `--lg1` → `--lg2` | green → blue | red → violet | gradient words |
| `--btn1-bg` | green | near-black | primary button |
| `--w1/--w2/--w3` | green / blue / violet | peach / sage / sand | background washes |
| `--done/--wait/--stop` | green / amber / coral | darker equivalents | status chips |

Canvases read `--fx-*` tokens (RGB triplets) and redraw when the theme flips.
Type is Geist (display + body) and Geist Mono (labels).

## Motion and effects

| Where | Effect |
| --- | --- |
| Preloader | "NIS Unib." opens letter by letter into "Nazzas Ibn Shams Unib." |
| Name reveal (top of page) | pinned scroll scene: the framed portrait grows, then condenses into the letters of the name (SVG mask), an outline traces the letters and the tagline rises; plays in reverse when scrolling back |
| Hero background | 2D-canvas particle network; particles within 160px of the cursor draw a line to it; cursor spotlight; glowing horizon arc (dark only); rotating wireframe cubes |
| Hero cards | glass card rig that tilts toward the pointer (±12° / ±9°); live chat demo that types answers from `content.js`; voice-note waveform + role typewriter; approval card that flips between "waiting" and "available" |
| Hero foot | live ticker of experience entries with status-coloured dots |
| About | rotating wireframe globe (230 points, light pulses, leans to the cursor); ledger-style stat strip; education steps with a scroll-filled rail |
| Experience | pipeline strip whose steps light one after another; scroll-filled centre spine |
| Business | 3D tile pipeline — a light packet travels research → partnership, last tile glows amber |
| Textile | stacked glass layers on a tilted plane with check tags popping in |
| Social | 3D ring carousel of platforms |
| Contact | voice orb — a lit sphere inside two rings of level bars |
| Everywhere | cursor-following glow inside every `.card`, scroll reveal, 2px progress bar, button sheen, grid + grain texture |

Everything is gated behind `prefers-reduced-motion`, and every canvas stops
drawing while it is off screen.

## Structure

```
index.html              Vite entry
src/
  main.jsx              global.css imported BEFORE App (cascade order matters)
  App.jsx               section order, Lenis smooth scroll, preloader gate
  data/content.js       ALL copy, links, skills, events — edit here
  lib/scroll.js         single scroll authority (Lenis-aware)
  lib/theme.js          light/dark mode: setMode, useTheme, onThemeChange
  hooks/index.js        typewriter, count-up, tilt, active-section, scroll lock
  styles/global.css     dark + light tokens, base, buttons, chips
  components/
    ui/Primitives.jsx   Section, SectionHead, SplitWords, GradientLine, …
    ui/Icon.jsx         one inline SVG icon set (no icon library)
    Ambient.jsx         scroll progress, back-to-top, page-wide card glow
    fx/useCanvas.js     shared canvas loop (DPR, off-screen pause, theme)
    fx/HeroField.jsx    hero particle network + cursor lines
    fx/Globe.jsx        wireframe globe          fx/VoiceOrb.jsx  voice orb
    fx/Stack3D.jsx      LayerStack, TileFlow, Ring3D (CSS 3D)
    NameReveal.jsx      scroll-pinned portrait → name opener
    Preloader.jsx  Navbar.jsx  Hero.jsx  About.jsx  Skills.jsx
    Experience.jsx  Projects.jsx  GitHubPanel.jsx  Expertise.jsx
    Events.jsx  Achievements.jsx  Social.jsx  Contact.jsx  Footer.jsx
```

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
