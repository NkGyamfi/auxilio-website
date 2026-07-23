# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Screenshot:** captured live during extraction (desktop: logo + social icons on one row, then divider, then legal links + copyright on one row; mobile: logo row, divider, legal links stacked above copyright, then definition paragraph below with extra top margin)
- **Interaction model:** static; hover-only link states

## DOM Structure
```
<footer class="min-w-full bg-primary text-white">
  <div class="mx-auto max-w-5xl px-6 pb-12 pt-16">
    <div class="flex items-center justify-between"> {/* logo + social row */}
      <Logo class="h-8 w-auto" /> {/* full lockup: icon mark + "headroom" wordmark, same component as NavMenu's logo, smaller / no button wrapper — just a static logo, not a link */}
      <div class="flex items-center gap-2"> {/* social icons row */}
        <a href="https://instagram.com/headroomai" class="..."><InstagramIcon /></a>
        <a href="https://twitter.com/headroomai" class="..."><XIcon /></a>
        <a href="https://linkedin.com/company/headroomai" class="..."><LinkedinIcon /></a>
      </div>
    </div>
    <hr class="my-6 border-white/20" /> {/* divider — exact color/spacing approximated from screenshot, not individually computed-style-extracted; visually a thin ~1px line at roughly white/15-20% opacity with vertical margin ~24px */}
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-6">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </div>
      <p class="text-white/70">© 2026 Archetype Labs, Inc. All rights reserved.</p>
    </div>
    <p class="mt-10 max-w-3xl text-white/60"> {/* repeated definition copy, extra top margin separating it from the legal row */}
      <span class="font-medium text-white">Headroom</span> (<em class="italic">n.</em>) The distance between where a business operates today and where it could operate at full potential—measured in revenue uncaptured, customers unserved, and hours lost to work that shouldn't exist.
    </p>
  </div>
</footer>
```

**Important — icon order differs from NavMenu:** footer social icons render **Instagram, X, LinkedIn** (confirmed from live DOM query order), while the NavMenu dialog's "FOLLOW" row renders **LinkedIn, X, Instagram**. Do not unify these into one shared order — replicate each independently using `SOCIAL_LINKS` from `src/types/headroom.ts`, reordered per component as needed.

## Computed Styles (exact values)

### Footer element
- `background-color: rgb(20, 60, 255)` (`bg-primary`, i.e. `--primary: #143cff` — note this is a slightly different blue than the hero/main's literal `#123bff`; keep them distinct per their respective source classes, do not conflate)
- `color: #FFFFFF`
- `min-width: 100%`

### Container
- `margin-inline: auto; max-width: 1024px` (`max-w-5xl`)
- `padding: 64px 24px 48px` (`px-6 pt-16 pb-12`)

### Logo
- Same `Logo` component/markup as the fixed header logo (`src/components/icons.tsx`), rendered at `height: 32px` (`h-8`), white fill, NOT wrapped in a button/link here (footer logo is static, confirmed via DOM — `logoWrapperTag: "none"`)

### Social icons row
- Each icon link: `inline-flex size-10 items-center justify-center` sizing consistent with the NavMenu's social icons; color treatment inferred as `text-white/60` → `hover:text-white` (same pattern used elsewhere on this page for muted-icon-to-white hover; not independently re-measured for the footer instance but visually consistent in the screenshot)

### Legal row
- Links: "Privacy Policy", "Terms of Service" — plain text links, muted white, standard underline-on-hover expected (matches the site's link pattern elsewhere; exact class string not individually captured for these two but should follow the same `text-white/70 hover:text-white` treatment visible in the screenshot)
- Copyright text: `color: rgba(255,255,255,0.7)` approx, small size

### Definition paragraph (footer repeat)
- Same content as the NavMenu dialog's definition text, styled larger/lighter here: `color: rgba(255,255,255,0.6)` approx, `max-width` constrained (~3xl / 640px equivalent), positioned with extra top margin (~40px) separating it from the legal row above

## States & Behaviors
- **Social icons:** hover changes icon color from muted to full white (`transition-colors`)
- **Legal links:** standard hover (assume underline or brightness change consistent with the rest of the site's link treatment — no unique behavior observed)
- No scroll-driven or time-driven behavior.

## Assets
- `Logo`, `InstagramIcon`, `XIcon`, `LinkedinIcon` from `src/components/icons.tsx`
- Social hrefs from `SOCIAL_LINKS` in `src/types/headroom.ts` (reorder to Instagram, X, LinkedIn for this component)

## Text Content (verbatim)
- "Privacy Policy"
- "Terms of Service"
- "© 2026 Archetype Labs, Inc. All rights reserved."
- "**Headroom** (*n.*) The distance between where a business operates today and where it could operate at full potential—measured in revenue uncaptured, customers unserved, and hours lost to work that shouldn't exist."

## Responsive Behavior
- **Desktop (≥640px, `sm:`):** legal-links row and copyright sit side-by-side (`flex-row justify-between`)
- **Mobile (<640px):** legal-links row and copyright stack vertically (`flex-col`); logo/social row stays side-by-side at all widths per screenshot evidence
- **Breakpoint:** Tailwind `sm:` (640px)
