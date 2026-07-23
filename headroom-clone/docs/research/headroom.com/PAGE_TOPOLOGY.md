# Headroom.com — Page Topology

Single-page marketing site (Next.js, no `__NEXT_DATA__` global — App Router RSC). Total document height ≈ 2979px at 1440px viewport, ≈ 3369px at 390px viewport.

## Layer stack (z-index, top to bottom of DOM = bottom to top visually is NOT the case here — see z-index)

1. **Fixed runner background** (`z-0`) — `position: fixed; inset-x-0; top-0; height: min(100svh,100dvh)`. Centered flex container holding a single `<img src="/runner.gif">` at `opacity: 0.3` (constant, non-scroll-driven — verified via JS at scrollY 0/700/2208, style never changes). Responsive width via `w-[min(74vw,360px)] sm:w-[min(72vw,560px)] lg:w-[min(80vw,800px)]`, `aspect-[16/9]`. Pure decorative time-based GIF loop (the "running figure made of bars" animation is baked into the GIF itself, not JS/canvas). `pointer-events-none`.
2. **Logo + nav-menu button** (`z-[200]`) — `position: fixed; inset-x-0; top-8 sm:top-10`, centered. Contains a `<button aria-haspopup="dialog">` wrapping the Headroom SVG wordmark logo. Click toggles a dropdown dialog panel (see NavMenu spec). This is FIXED (not scroll-hiding) — visible at all scroll positions, all pages.
3. **`<main id="top">`** (`z-auto`, `bg-[#123bff]`) — contains, in DOM order:
   a. The fixed runner div (described above, first child, `position:fixed` so visually behaves as layer 1)
   b. The fixed logo div (described above)
   c. **Hero container** — `relative h-[220svh] lg:h-[125svh]` — a very tall spacer whose only content is the H1 + CTA row, positioned near the top of this tall container (likely `sticky` or simply normal flow — verified H1 has NO scroll-linked opacity/transform change; it just scrolls out of normal document flow as the user scrolls, revealing the persistent fixed runner behind it for the remainder of the tall container). This tall-container-with-content-near-top is what creates the "reveal the runner" scroll effect — it's simple CSS scrolling, not JS-driven.
   d. **`<section id="get-started">`** — the lead-capture form card (`z-10`).
   e. **Trailing spacer div** — `relative z-10 h-[60svh] sm:h-[90svh]` — empty, just lets more of the fixed runner show through before the footer.
4. **`<footer>`** (`bg-primary` ≈ `rgb(20,60,255)` / `#143cff`) — logo, social icons, legal links, copyright, repeated "Headroom (n.)" definition text.

## Sections (in visual scroll order)

| # | Name | Interaction model | Notes |
|---|------|-------------------|-------|
| 1 | Fixed background runner | time-driven (GIF autoplay) | Always mounted, opacity 0.3 constant |
| 2 | Fixed logo/nav button | click-driven (opens dialog) | Always visible, `z-[200]`, highest layer |
| 3 | Hero (headline + CTAs) | static (scrolls away via normal flow) | Tall wrapper (220svh/125svh) creates scroll runway |
| 4 | Get-started lead form | static form, client-side validation | Real `<select>` elements, disabled Submit until required fields filled |
| 5 | Trailing spacer | static | Just reveals background runner before footer |
| 6 | Footer | static, hover-only link states | Repeats logo + social + legal + definition copy |
| — | Nav menu dialog | click-driven overlay | Triggered from the fixed logo button; anchored dialog, not a full-screen modal |

## Responsive breakpoints observed

- **Mobile (390–406px effective):** CTA row is `flex-col-reverse` (manifesto link stacks ABOVE Get started button, despite DOM order being button-then-link). Hero heading wraps to more lines. Form card padding drops (`p-6` vs `sm:px-12 sm:py-8`). Heading "Tell us about your business" wraps 2 lines.
- **Desktop (≥640px `sm:`, ≥1024px `lg:`):** CTA row becomes `flex-row`. Hero container height changes from `220svh` to `125svh` at `lg:`. Runner background max-width steps: 360px (mobile) → 560px (sm) → 800px (lg).
- Breakpoint tokens used throughout: Tailwind default `sm:` (640px) and `lg:` (1024px). No custom breakpoints detected.

## Known gaps / out of scope

- Nav menu links to `/manifesto`, `/agencies`, `/get-access`, and `https://app.headroom.com/` (login) — these are separate pages/subdomains not covered by this clone (scope = homepage only per skill defaults). Links will be wired to the same relative paths but those routes will 404 in the clone unless the user asks to extend scope.
- Social links: LinkedIn (`linkedin.com/company/headroomai`), X (`twitter.com/headroomai`), Instagram (`instagram.com/headroomai`) — real URLs, kept as-is.
