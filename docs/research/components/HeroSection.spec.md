# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/headroom.com/desktop-hero-1440.jpg` (desktop), `docs/design-references/headroom.com/mobile-form-390.jpg` (mobile, shows the tail end scrolled to form — hero itself was captured live, see description below for mobile hero: heading wraps "You built your / business by hand." then "We'll help you run it with / AI." on its own two lines, CTA row is manifesto-link-above-button)
- **Interaction model:** static (the "text scrolls away revealing background" effect is PLAIN CSS DOCUMENT FLOW, not JS/scroll-linked — see BEHAVIORS.md for full verification). Do not implement any scroll listener, IntersectionObserver, or opacity/transform animation for this section.

## DOM Structure
```
<main id="top" class="blue relative bg-[#123bff] text-ink selection:bg-white selection:text-paper">
  {/* 1. fixed decorative background runner */}
  <div class="pointer-events-none fixed inset-x-0 top-0 z-0 flex h-[min(100svh,100dvh)] items-center justify-center">
    <div style="opacity: 0.3">
      <div class="relative aspect-[16/9] w-[min(74vw,360px)] sm:w-[min(72vw,560px)] lg:w-[min(80vw,800px)]">
        <img src="/images/runner.gif" alt="" class="object-contain" style="position:absolute; inset:0; height:100%; width:100%;" />
      </div>
    </div>
  </div>

  {/* 2. <NavMenu /> — separate component, see NavMenu.spec.md, rendered here as a sibling */}

  {/* 3. tall hero text container */}
  <div class="relative h-[220svh] lg:h-[125svh]">
    <!-- heading + CTAs sit near the top of this tall container in normal flow -->
    <div class="...">
      <h1 class="mx-auto text-balance font-lusanne sm:max-w-6xl">
        <span class="block !text-[36px] font-bold leading-[1.05] tracking-[-0.02em] sm:!text-[88px] sm:leading-[100%]">
          You built your business by hand.
        </span>
        <span class="relative mx-auto mt-4 block max-w-[20ch] overflow-visible !text-[26px] font-normal leading-[1.15] tracking-[-0.02em] sm:mt-8 sm:min-h-[1.2em] sm:max-w-none sm:!text-[56px] sm:leading-[100%]">
          We'll help you run it with AI.
        </span>
      </h1>
      <div class="mt-8 flex flex-col-reverse items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:gap-x-6 sm:gap-y-3">
        <Button>Get started</Button>
        <a class="inline-flex min-h-11 shrink-0 items-center px-1 text-sm text-white underline underline-offset-4 opacity-80 transition-opacity visited:text-white hover:text-white hover:opacity-100 focus:text-white active:text-white">Read the manifesto</a>
      </div>
    </div>
    <!-- scroll-down chevron indicator, near bottom of viewport on initial load -->
    <ChevronDownIcon class="text-white/55" width={20} height={20} />
  </div>

  <GetStartedForm /> {/* separate component, see GetStartedForm.spec.md */}

  {/* trailing spacer — lets the fixed runner show through before the footer */}
  <div class="relative z-10 h-[60svh] sm:h-[90svh]" />
</main>
```

## Computed Styles (exact values)

### Fixed background runner
- Outer: `position: fixed; inset-inline: 0; top: 0; z-index: 0; height: min(100svh,100dvh); display: flex; align-items: center; justify-content: center; pointer-events: none`
- Inner (opacity wrapper): inline style `opacity: 0.3` — **constant at all scroll positions, verified**, do not animate
- Image container: `position: relative; aspect-ratio: 16/9; width: min(74vw,360px)` → `sm: min(72vw,560px)` → `lg: min(80vw,800px)`
- `<img>`: `object-fit: contain`, absolutely positioned to fill container (`inset:0; height:100%; width:100%`)
- Verified fixed rect at 1440px-class viewport: `{top: 160.5, left: 142, width: 800, height: 450}` — identical at scrollY 0, 700, 800, 2208 (never moves, never resizes with scroll)

### H1 — line 1 ("You built your business by hand.")
- `font-family: var(--font-heading)` (TWK Lausanne in original; substituted with Plus Jakarta Sans — see globals.css comment)
- Desktop (`sm:` and up): `font-size: 88px; line-height: 88px (100%); font-weight: 700; letter-spacing: -1.76px; color: #FFFFFF`
- Mobile: `font-size: 36px; line-height: 1.05; font-weight: 700; letter-spacing: -0.02em`

### H1 — line 2 ("We'll help you run it with AI.")
- Desktop: `font-size: 56px; line-height: 56px (100%); font-weight: 400; letter-spacing: -1.12px; color: #FFFFFF`
- Mobile: `font-size: 26px; line-height: 1.15; font-weight: 400; letter-spacing: -0.02em`
- `margin-top: 16px` mobile → `32px` at `sm:`; `max-width: 20ch` mobile, unconstrained at `sm:`

### CTA row
- `margin-top: 32px` → `40px` at `sm:`
- `display: flex; flex-direction: column-reverse; align-items: center; justify-content: center; gap: 16px` → **`sm:` → `flex-direction: row; column-gap: 24px; row-gap: 12px`**
- This `flex-col-reverse` is why "Read the manifesto" visually sits ABOVE "Get started" on mobile despite the button being first in DOM order — keep DOM order button-then-link; let CSS handle the reversal.

### "Get started" button
- Base shared button classes: `ring-offset-paper focus-visible:ring-ring relative inline-flex select-none items-center justify-center gap-x-1.5 rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 h-10 group overflow-hidden px-4 py-2 font-medium text-lg min-h-12`
- Variant: `border-white bg-white text-[#123bff]` → **hover:** `bg-white/[0.92]` → **focus:** `bg-white text-[#123bff]` → **active:** `bg-white/[0.85]`

### "Read the manifesto" link
- `inline-flex min-h-11 shrink-0 items-center px-1 text-sm text-white underline underline-offset-4 opacity-80 transition-opacity` → **hover:** `opacity-100` (color stays white; `visited/focus/active` all force `text-white` to prevent default purple-visited-link color)

### Scroll chevron
- `ChevronDownIcon` (20×20, path `M4 7l6 6 6-6`, `stroke-width:1.5`), color `text-white/55`, centered horizontally beneath the CTA row

### Tall wrapper heights
- `.hero-tall { height: 220svh }` → `lg: height: 125svh` (this is what creates the long scroll runway; the heading block itself is NOT tall, it just sits near the top via normal flow inside this tall relative container)
- Trailing spacer after `GetStartedForm`: `height: 60svh` → `sm: height: 90svh`

## States & Behaviors
- **No scroll-driven behavior in this section** (re-confirmed multiple times during extraction — see BEHAVIORS.md). Build this as plain static markup; the "reveal" effect emerges automatically from normal scrolling once the tall wrapper + fixed background are both in place.
- Hover/focus/active states on the two CTAs as documented above.

## Assets
- `/images/runner.gif` (downloaded, 1540×1540 source, displayed at up to 800×450)
- `Logo`, `ChevronDownIcon` from `src/components/icons.tsx`
- shadcn `Button` primitive for "Get started" (or plain `<button>`/`<a>` styled with the exact classes above if the shadcn variant doesn't map cleanly — match visual output exactly either way)

## Text Content (verbatim)
- "You built your business by hand."
- "We'll help you run it with AI."
- Button: "Get started" (links to `/get-access` or `#get-started` anchor — original site's exact target wasn't captured; wire to `#get-started` anchor scroll since that id exists on this same page)
- Link: "Read the manifesto" → `/manifesto`

## Responsive Behavior
- **Desktop (≥1024px, `lg:`):** hero tall wrapper `125svh`; H1 sizes as documented; background runner max-width 800px
- **Tablet/Desktop (≥640px, `sm:`):** CTA row switches to `flex-row`; background runner max-width 560px
- **Mobile (<640px):** hero tall wrapper `220svh`; CTA row `flex-col-reverse`; background runner max-width `min(74vw,360px)`
- **Breakpoints:** Tailwind `sm:` (640px), `lg:` (1024px) only
