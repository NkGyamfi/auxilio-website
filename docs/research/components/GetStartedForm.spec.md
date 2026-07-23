# GetStartedForm Specification

## Overview
- **Target file:** `src/components/GetStartedForm.tsx`
- **Screenshot:** `docs/design-references/headroom.com/mobile-form-390.jpg` (mobile); desktop form was captured live during extraction (see description: card is `sm:px-12 sm:py-8`, heading stays on one line at desktop vs wrapping to two lines on mobile)
- **Interaction model:** static form (no client-side dynamic reveal/steps observed); Submit button is `disabled` until required fields are filled (standard HTML `required` + `disabled` state, not JS-animated)

## DOM Structure
```
<section id="get-started" class="relative z-10 px-6 pb-24 pt-8 sm:px-8 sm:pb-32 sm:pt-12">
  <div class="my-10 flex grow flex-col gap-8 rounded-lg bg-white/10 p-6 pb-8 backdrop-blur-lg sm:my-20 sm:w-full sm:px-12 sm:py-8 sm:pb-12">
    <div class="flex items-center justify-between gap-4">
      <h3>Tell us about your business</h3>
      <HologramIcon class="text-ink" width={64} height={64} />
    </div>
    <p>We'll learn how your business runs, build your system, and ship it. Backed by our 90-day money-back guarantee.</p>
    <form class="flex flex-col gap-8">{/* gap between form and above content is the card's own gap-8; fields themselves stack with their own spacing, approx gap-4/space-y-4 — not individually captured, use 16px vertical rhythm between fields based on screenshot measurement */}
      <input type="email" placeholder="Email address" required />
      <input type="text" placeholder="Business name" required />
      <div class="relative">
        <select required><option value="">Select business type</option>{/* ...BUSINESS_TYPE_OPTIONS */}</select>
        <SelectChevronIcon class="pointer-events-none absolute inset-y-0 right-3 ... text-white/80" />
      </div>
      <div class="relative">
        <select required><option value="">Select team size</option>{/* ...TEAM_SIZE_OPTIONS */}</select>
        <SelectChevronIcon class="pointer-events-none absolute inset-y-0 right-3 ... text-white/80" />
      </div>
      <textarea placeholder="Brief description of your business and what you're looking to achieve" />
      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  </div>
</section>
```

## Computed Styles (exact values)

### Section wrapper
- `position: relative; z-index: 10; padding: 32px 24px 96px` mobile → `sm: padding: 48px 32px 128px` (`px-6 pb-24 pt-8 sm:px-8 sm:pb-32 sm:pt-12`)

### Card
- `display: flex; flex-direction: column; gap: 32px` (`gap-8`)
- `margin-block: 40px` mobile → `80px` at `sm:` (`my-10 sm:my-20`)
- `padding: 32px 24px 48px` mobile (from `p-6 pb-8` ≈ 24px/24px/32px — use Tailwind `p-6` = 24px all sides, `pb-8` override = 32px bottom) → `sm: padding: 32px 48px 48px` (`sm:px-12 sm:py-8 sm:pb-12` → 32px top, 48px l/r, 48px bottom)
- `background-color: rgba(255,255,255,0.10)`
- `border-radius: 8px` (`rounded-lg`)
- `backdrop-filter: blur(16px)` (`backdrop-blur-lg`)
- `color: #FFFFFF; font-family: var(--font-sans)` (Inter)

### Heading row
- `display: flex; align-items: center; justify-content: space-between; gap: 16px` (`gap-4`)
- `<h3>` "Tell us about your business": `font-size: 24.4px` at the (desktop) sample taken — this reads as ~24px/1.5rem `font-heading` bold white; wraps to 2 lines on mobile within the card's narrower width. Use `font-heading` (Plus Jakarta Sans substitute), weight 700, size `text-2xl` (24px) as the closest Tailwind step matching the measured 24.4px.
- `HologramIcon`: 64×64, `color: currentColor` resolving to the `text-ink` ancestor class (render white on this dark card — treat `text-ink` here as effectively white per the visual; do not literally import a separate "ink" design token unless one already exists in globals.css, in which case make sure it resolves to a light color on this dark background)

### Description paragraph
- Plain white body text (`text-white`, default `font-sans`), sits between heading row and form fields, `gap-8` from the card's flex column provides spacing above/below

### Inputs (email, text)
- `height: 48px` (`h-12`), `border-radius: 6px` (`rounded-md`), `border: 1px solid rgba(255,255,255,0.3)`, `background-color: rgba(255,255,255,0.10)`, `padding: 16px` (`p-4`), `font-size: 16px` (`text-base`), `color: #FFFFFF`, placeholder `rgba(255,255,255,0.5)`
- **focus-visible:** `outline: none; ring: 2px rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.8)`
- **disabled:** `opacity: 0.5`

### Selects
- Native `<select>` elements (verified — NOT custom listbox/combobox components)
- `height: 48px; width: 100%; appearance: none; border-radius: 6px; border: 1px solid rgba(255,255,255,0.3); background-color: rgba(255,255,255,0.10); padding: 0 40px 0 16px` (`px-4 pr-10`), `font-size: 16px; line-height: tight`
- Empty/placeholder state text color: `rgba(255,255,255,0.5)` (`text-white/50` — applied to the select element itself when the placeholder option is selected)
- `SelectChevronIcon` (24×24, path `M19 9l-7 7-7-7`) absolutely positioned `inset-y-0 right-3`, `pointer-events-none`, `color: rgba(255,255,255,0.8)`, size 16px (`size-4`)
- Real option lists — see `BUSINESS_TYPE_OPTIONS` and `TEAM_SIZE_OPTIONS` in `src/types/headroom.ts` (verbatim, already extracted from the live `<select>` elements)

### Textarea
- Same visual treatment as inputs (`rounded-md border border-white/30 bg-white/10 p-4 text-base text-white placeholder:text-white/50`, same focus-visible ring)
- `height: 96px` (`h-24`), `resize: none`

### Submit button
- Shared button base classes (same family as hero's "Get started"): `relative inline-flex select-none items-center justify-center gap-x-1.5 rounded-md border font-medium transition-colors h-12 w-full sm:w-min px-4 text-base`
- Variant: `border-primary bg-primary text-primary-foreground` → **hover:** `bg-primary/80`
- **disabled:** `bg-brand/30 text-white/30 border-transparent pointer-events-none` — disabled by default until required fields are valid (use native HTML5 form validation: `required` on email/name/selects, `type="email"` for the email field, and gate the `disabled` prop on a controlled-form `isValid` check, OR simplest: rely on native `<button disabled={!formRef.current?.checkValidity()}>` recomputed on change)

## States & Behaviors
- **Submit disabled → enabled:** disabled by default; becomes enabled once all `required` fields have valid values. No animation — just a class/attribute swap producing the visual diff described above.
- No hover states documented for inputs/selects/textarea beyond the shared focus-visible ring.
- No scroll-driven or time-driven behavior in this section.

## Assets
- `HologramIcon` from `src/components/icons.tsx`
- `SelectChevronIcon` from `src/components/icons.tsx`
- Option data from `src/types/headroom.ts` (`BUSINESS_TYPE_OPTIONS`, `TEAM_SIZE_OPTIONS`)

## Text Content (verbatim)
- Heading: "Tell us about your business"
- Description: "We'll learn how your business runs, build your system, and ship it. Backed by our 90-day money-back guarantee."
- Placeholders: "Email address", "Business name", "Select business type", "Select team size", "Brief description of your business and what you're looking to achieve"
- Button: "Submit"

## Responsive Behavior
- **Desktop (≥640px, `sm:`):** card padding `32px 48px 48px`; card margin-block `80px`; Submit button `width: min-content` (shrinks to fit)
- **Mobile (<640px):** card padding `24px/24px/32px` (`p-6 pb-8`); card margin-block `40px`; heading wraps to 2 lines; Submit button full width
- **Breakpoint:** Tailwind `sm:` (640px)
