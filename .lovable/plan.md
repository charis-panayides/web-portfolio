
## Goal

Replace the placeholder rectangles (currently showing `websiteLabel` text) on the index page and on each project detail page with an actual embedded, interactive version of the site — so hovering over the frame lets the visitor scroll and click inside the real website.

## Behaviour

- Each project card on `/` shows a live `<iframe>` of `project.website` inside the existing 16:10 rectangle (browser chrome dots stay on top).
- By default the iframe is **non-interactive** (`pointer-events: none`) so the whole card stays clickable and hovering doesn't hijack page scroll.
- On hover (desktop) or on an explicit "Interact" toggle, `pointer-events` turn on and the user can scroll/click inside the real site. Leaving the frame or clicking outside restores the card link.
- A subtle label ("Hover to interact ↗") appears in the corner so the affordance is discoverable.
- On the project detail page (`/projects/$slug`), the big desktop rectangle and the mobile rectangle become the same live iframe — desktop at full width, mobile at ~375px width using CSS `transform: scale()` so the site renders in its mobile layout.
- Loading state: a faint "Loading {domain}…" label sits behind the iframe until `onLoad` fires.
- Touch devices: iframes are always interactive (no hover), and the card link is replaced by a small "View project →" button so taps don't conflict.

## Known limitation (must call out)

Some sites send `X-Frame-Options: DENY` / `SAMEORIGIN` or a `frame-ancestors` CSP and simply refuse to load in an iframe. Of the four current sites (aktina.com.cy, cy-omt.com, miaforakienankairo.com.cy, viiibearchitects.com) any of them could block embedding — we won't know until we try. For any site that blocks, the frame will render blank.

Fallback: if the iframe fails to load within ~4s, we swap in a static "Preview unavailable — visit site ↗" panel that links out. This keeps the layout intact.

## Technical notes

- New component `src/components/LiveSitePreview.tsx`:
  - Props: `url`, `label`, `variant: "desktop" | "mobile"`.
  - Renders `<iframe src={url} loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" referrerPolicy="no-referrer" />`.
  - Wrapper handles `pointer-events` toggle via `onMouseEnter` / `onMouseLeave` and an `interactive` state.
  - Mobile variant: iframe rendered at fixed `width: 390px`, then CSS-scaled to fit the 320px phone mock.
  - Detects load-failure via a timeout (no `onLoad` fired) → shows fallback.
- `src/routes/index.tsx`: replace the placeholder `<div className="absolute inset-0 flex items-center justify-center ...">{p.websiteLabel}</div>` block with `<LiveSitePreview url={p.website} label={p.websiteLabel} variant="desktop" />`. Keep the three dots and hover scale. Because the iframe swallows hover events when active, wrap only the text/meta area in the `<Link>` and move the card-level click to just the title + "View Project" affordance (so hovering the iframe never navigates away).
- `src/routes/projects.$slug.tsx`: same swap for the "Desktop screenshot" and "Mobile screenshot" placeholders.
- No new dependencies. No changes to `projects.ts` (URLs are already there).

## Out of scope

- No screenshot-service fallback (e.g. thum.io) unless you want it — say the word and I'll add it as the fail-open instead of the plain "Preview unavailable" panel.
- No changes to typography, grid background, grain, or copy.
