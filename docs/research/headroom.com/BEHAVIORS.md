# Headroom.com — Behavior Bible

## Scroll sweep findings

- **No scroll-linked header transition.** Verified: the fixed logo button's `className` is byte-identical at `scrollY=0` and `scrollY=800`. What looked like a "pill outline appearing after scroll" in an early screenshot was actually a lingering `focus-visible` keyboard-focus ring left over from a prior click — NOT a scroll effect. Do not build any scroll-triggered header chrome change.
- **No scroll-linked opacity/transform on the fixed runner GIF.** Verified via direct `getComputedStyle`/inline-style reads at scrollY 0, 700, 800, 2208 — inline style is always `opacity: 0.3; transform: none;`. The apparent "size/position change" between screenshots is just the GIF's own animation frames (a running figure with limbs in different positions each frame), not a container resize. Container rect is pixel-identical (`{x:142,y:160.5,width:800,height:450}` at 1084 CSS px viewport) regardless of scroll position.
- **The "hero text scrolls away" effect is plain document flow, not JS/GSAP.** `h1` has `opacity: 1` and `transform: none` at every scroll position tested; only its `getBoundingClientRect().top` changes (e.g. `-362.77px` at `scrollY=800`). The hero's outer wrapper is simply very tall (`h-[220svh] lg:h-[125svh]`) with the heading content sitting near its top, so scrolling naturally carries the heading off-screen while the fixed background runner remains visible underneath for the rest of the tall container. No IntersectionObserver, no `animation-timeline`, no scroll-snap detected anywhere on the page (`gsap` is `undefined` on `window`; no `.lenis` / `.locomotive-scroll` classes present).
- No scroll-snap points detected (`scroll-snap-type` absent).

## Click sweep findings

- **Logo button → nav menu dialog.** `<button aria-label="Headroom menu" aria-haspopup="dialog" aria-expanded="…">`. Click toggles `aria-expanded` true/false and renders a `role="dialog"` panel positioned `absolute top-full` under the logo (NOT a full-screen modal/overlay — no backdrop dimming behind it). Panel:
  - Container: `overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-2xl`, width `min(92vw,20rem)` mobile → `22rem` at `sm:`.
  - Content padding wrapper: `flex flex-col gap-5 px-5 pb-6 pt-5`.
  - Definition paragraph: `text-[13px] leading-[1.5] text-white/80` with a bold `<span class="font-medium text-white">Headroom</span>` lead-in and italic `(n.)`.
  - Nav links list, each: `group flex min-h-11 items-center justify-between rounded-md px-2 py-3 no-underline transition-colors hover:bg-white/10`, uppercase label + trailing arrow SVG (`size-[14px]`) that likely translates on hover (see Hover sweep).
    - Home → `/`
    - Manifesto → `/manifesto`
    - Agencies → `/agencies`
    - Get access → `/get-access`
    - Login → `https://app.headroom.com/`
  - Footer row inside panel: "FOLLOW" label (small caps, muted) + 3 social icon links (LinkedIn, X, Instagram in that order), each `inline-flex size-10 items-center justify-center text-white/60 transition-colors hover:text-white`.
  - Close: `Escape` key closes it (confirmed). Standard dialog dismiss behavior expected (click-outside likely also closes — not explicitly tested but assume standard Radix/headless-ui dialog behavior).
- **Form selects are native `<select>` elements** — not custom listboxes/comboboxes (`document.querySelectorAll('select').length === 2` inside `#get-started`, no `role="combobox"`/`role="listbox"` elements found). Build with plain `<select>`.
- **Submit button is disabled** until required fields are filled (`disabled` attribute present on initial load; classes include `disabled:bg-brand/30 disabled:text-white/30 disabled:pointer-events-none disabled:shadow-none disabled:border-transparent`).

## Hover sweep findings

- Nav menu links: `hover:bg-white/10` background wash, `transition-colors`.
- Nav menu social icons: `text-white/60` → `hover:text-white`, `transition-colors`.
- Hero "Get started" button: `bg-white text-[#123bff]` → `hover:bg-white/[0.92]`, `focus:bg-white focus:text-[#123bff]`, `active:bg-white/[0.85]`. Also has `data-[state=open]:bg-primary/80` (shared button component with open-state styling, likely unused here since it's a link-styled anchor/button not a trigger).
- Hero "Read the manifesto" link: `text-white underline underline-offset-4 opacity-80` → `hover:opacity-100`, `transition-opacity`.
- Logo button: `bg-transparent backdrop-blur-md` → `hover:backdrop-blur-lg`, `transition-[backdrop-filter]`.
- Submit button (enabled state, inferred from shared button classes): `bg-primary` → `hover:bg-primary/80`.

## Responsive sweep (390px / 768px assumed / 1440px tested)

- **1440px (desktop):** Hero H1 line 1 `88px/88px` (`font-weight:700`), line 2 (subheading span) `56px/56px` (`font-weight:400`). CTA row `flex-row`, `gap-x-6 gap-y-3`. Get-started card: `p-6` base + `sm:px-12 sm:py-8` overrides → effectively `32px 48px 48px` padding, `border-radius:8px`, `bg-white/10`, `backdrop-blur-lg` (16px).
- **390px (mobile):** Hero H1 line 1 `36px/1.05` bold, line 2 `26px/1.15`. CTA row `flex-col-reverse` (manifesto link visually above button; DOM order unchanged — button first, link second — purely a CSS flex-direction trick, do not reorder JSX). Get-started card padding `p-6` (24px all sides), heading wraps to 2 lines within its `max-w` constraint.
- Breakpoint switch points: Tailwind default `sm:` (640px) and `lg:` (1024px) only — no custom breakpoints found in any observed class list.
- No layout reflow surprises at tablet width beyond the standard `sm:`/`lg:` Tailwind steps already documented above (not separately re-verified at exactly 768px, but no classes reference a `md:` prefix anywhere in the DOM sampled, so 640–1023px should render identically to the mobile breakpoint below `lg:`).

## Time-driven behavior

- `/runner.gif` (1540×1540 natural size, displayed at up to 800×450 `aspect-[16/9]`, `object-contain`) is a self-looping animated GIF depicting a running figure rendered as horizontal bar segments (a deliberate "under construction / wireframe" aesthetic). No JS controls playback — it is a plain `<img>` tag; the GIF's own frame timing drives the animation. Just download and reference the GIF file directly; no canvas/WebGL reimplementation needed.
