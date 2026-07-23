# NavMenu Specification

## Overview
- **Target file:** `src/components/NavMenu.tsx`
- **Screenshot:** `docs/design-references/headroom.com/desktop-hero-1440.jpg` (menu closed state); menu-open state not separately saved but described exactly below.
- **Interaction model:** click-driven (button toggles a `role="dialog"` anchored panel, not a full-screen modal — no backdrop dimming)

## DOM Structure
```
<div class="pointer-events-none fixed inset-x-0 top-8 z-[200] flex justify-center sm:top-10">
  <div class="relative flex w-max flex-col items-center pointer-events-auto">
    <div class="relative z-[200] flex h-8 items-center justify-center sm:h-10">
      <button aria-expanded="{bool}" aria-haspopup="dialog" aria-label="Headroom menu"
              class="inline-flex items-center justify-center rounded-2xl px-3 py-2 no-underline outline-none bg-transparent backdrop-blur-md transition-[backdrop-filter] hover:backdrop-blur-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              type="button">
        <div class="flex h-8 items-center sm:h-10">
          <Logo class="h-8 w-auto sm:h-10" /> {/* import from icons.tsx, currentColor -> text-white */}
        </div>
      </button>
    </div>
    {isOpen && (
      <div aria-label="Headroom" role="dialog" data-headroom-logo-menu="true"
           class="absolute left-[calc(50%-min(46vw,10rem))] top-full z-[199] mt-3 w-[min(92vw,20rem)] pt-2 sm:left-[calc(50%-11rem)] sm:w-[22rem]">
        <div class="overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-2xl">
          <div class="flex flex-col gap-5 px-5 pb-6 pt-5">
            {/* definition paragraph */}
            {/* nav links list */}
            {/* follow row */}
          </div>
        </div>
      </div>
    )}
  </div>
</div>
```

## Computed Styles (exact values)

### Fixed positioning wrapper
- `position: fixed; inset-x: 0; top: 32px` (`sm:top-10` = 40px)
- `z-index: 200`
- `pointer-events: none` on outer, `pointer-events: auto` on inner wrapper (so only the button/panel are clickable, not the full-width strip)

### Logo button
- `display: inline-flex; align-items: center; justify-content: center`
- `border-radius: 16px` (`rounded-2xl`), `padding: 8px 12px` (`px-3 py-2`)
- `background: transparent`
- `backdrop-filter: blur(8px)` (`backdrop-blur-md`) → **hover:** `blur(16px)` (`backdrop-blur-lg`), `transition-property: backdrop-filter`
- **focus-visible:** `outline: 2px solid white; outline-offset: 4px`
- Logo SVG rendered at `height: 32px` (`h-8`), `sm: height: 40px` (`h-10`), width auto, color `#FFFFFF` (via `currentColor` + `text-white` ancestor, or hardcode fill white)

### Dialog panel container
- `position: absolute; top: 100%; left: calc(50% - min(46vw, 10rem))` mobile → `calc(50% - 11rem)` at `sm:`
- `width: min(92vw, 20rem)` mobile → `22rem` (352px) at `sm:`
- `margin-top: 12px` (`mt-3`), `padding-top: 8px` (`pt-2`)
- `z-index: 199` (one below the button's 200, so the panel visually tucks under)

### Dialog inner card
- `overflow: hidden; border-radius: 12px` (`rounded-xl`)
- `border: 1px solid rgba(255,255,255,0.15)`
- `background: rgba(255,255,255,0.10)`
- `box-shadow: 0 20px 60px -12px rgba(0,0,0,0.45), inset 0 1px 0 0 rgba(255,255,255,0.18)`
- `backdrop-filter: blur(40px)` (`backdrop-blur-2xl`)

### Content wrapper
- `display: flex; flex-direction: column; gap: 20px` (`gap-5`)
- `padding: 20px 20px 24px` (`px-5 pt-5 pb-6`)

### Definition paragraph
- `font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.8)`
- Markup: `<p class="text-[13px] leading-[1.5] text-white/80"><span class="font-medium text-white">Headroom</span> (<em class="italic">n.</em>) The distance between where a business operates today and where it could operate at full potential—measured in revenue uncaptured, customers unserved, and hours lost to work that shouldn't exist.</p>`

### Nav links list
Each link:
- `display: flex; min-height: 44px; align-items: center; justify-content: space-between; border-radius: 6px; padding: 12px 8px; text-decoration: none; transition-property: color, background-color, border-color, ...` (`transition-colors`)
- **hover:** `background-color: rgba(255,255,255,0.10)` (`hover:bg-white/10`)
- Label rendered UPPERCASE (`text-xs font-medium uppercase tracking-wide text-white` — exact utility classes not individually captured, but visual is small-caps bold white label)
- Trailing character is a literal unicode arrow glyph `→` immediately after the label text (verified: NOT an SVG — `link.textContent` returns `"Home→"` with no space, and no `<svg>` child exists inside these particular anchors). Render as `<span aria-hidden>→</span>` or similar, not an icon component.

Links (real content, from `NAV_MENU_LINKS` in `src/types/headroom.ts`):
| Label | href |
|---|---|
| Home | `/` |
| Manifesto | `/manifesto` |
| Agencies | `/agencies` |
| Get access | `/get-access` |
| Login | `https://app.headroom.com/` |

### Follow row
- "FOLLOW" label: small, muted, letter-spaced uppercase caption (`text-xs uppercase tracking-wide text-white/50` — approximate; exact classes not individually captured but visually matches this pattern)
- 3 social icon links, each: `inline-flex size-10 items-center justify-center text-white/60 transition-colors hover:text-white`
- Icons: `LinkedinIcon`, `XIcon`, `InstagramIcon` from `src/components/icons.tsx`, in that exact order (LinkedIn, X, Instagram) — **note this order differs from the footer's icon order (Instagram, X, LinkedIn)**. Use `SOCIAL_LINKS` from `src/types/headroom.ts` for hrefs but reorder to LinkedIn-X-Instagram specifically for this component.

## States & Behaviors

### Open/close toggle
- **Trigger:** click on the logo button
- **State A (closed):** `aria-expanded="false"`, dialog not rendered in DOM
- **State B (open):** `aria-expanded="true"`, dialog rendered with `role="dialog"`
- **Transition:** no fade/slide transition was observed on the panel itself in the captured markup (appears/disappears immediately on toggle) — implement as a simple conditional render; do not invent an entrance animation not evidenced by the extraction.
- **Dismiss:** `Escape` key closes it (confirmed via testing). Also implement standard click-outside-to-close behavior (state-of-the-art dialog UX; not explicitly re-tested but safe default — use a simple `useEffect` document click listener checking `event.target` against a ref).
- **Implementation approach:** local `useState<boolean>` in a client component (`"use client"`), no external dialog library required — this is a lightweight anchored dropdown, not a Radix/headless-ui full modal (no focus-trap or backdrop overlay was observed).

### Hover states
- **Logo button:** `backdrop-filter: blur(8px) → blur(16px)`, `transition: backdrop-filter`
- **Nav links:** transparent → `bg-white/10`
- **Social icons:** `text-white/60` → `text-white`

## Assets
- `Logo` from `src/components/icons.tsx` (render at `currentColor` = white)
- `LinkedinIcon`, `XIcon`, `InstagramIcon` from `src/components/icons.tsx`

## Text Content (verbatim)
> **Headroom** (*n.*) The distance between where a business operates today and where it could operate at full potential—measured in revenue uncaptured, customers unserved, and hours lost to work that shouldn't exist.

Nav labels: Home, Manifesto, Agencies, Get access, Login
Follow label: FOLLOW

## Responsive Behavior
- **Desktop (≥640px):** panel `width: 22rem`, `left: calc(50% - 11rem)` (centered under the fixed logo column)
- **Mobile (<640px):** panel `width: min(92vw, 20rem)`, `left: calc(50% - min(46vw, 10rem))` (same centering formula, viewport-relative)
- **Breakpoint:** Tailwind `sm:` (640px)
