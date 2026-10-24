# WeWIN Cambridge — Premium Playful Mock Test Platform

## Product decisions

- Audience: primary school learners and their parents; focus on occasional mock tests.
- Overview: resume an actual draft, choose a level, inspect recent submitted results.
- Navigation: Overview, Cambridge practice (Starters / Movers / Flyers), Results, Leaderboard. Management is restricted to teachers and admins.
- No XP, streaks, daily tasks, fabricated achievements, notifications, flashcards or games.
- Learning session remains in English. Overview, library and personal history are in Vietnamese.
- Teacher/admin activity means persisted attempt start/submission times. Existing data does not contain login/logout events or a reliable historical device/IP log.

## Evidence and skill application

Read UI/UX Pro Max and Emil Design Engineering before implementation. The design-system search for `children education learning dashboard` matched Claymorphism and a child-learning palette, but its corporate conversion pattern was not applicable. A narrowed product search `education learning platform --domain product` verified Educational App and Kids Learning. Use their clear hierarchy, parent-facing progress and restrained playful surfaces. Brand, type and layout decisions below are project-specific overrides; do not apply the tool's corporate marketing CTA or replace the existing font with Comic Neue.

## Tokens

- Primary Royal Blue: `#004AAD`; hover `#003B8A`; on-primary white.
- Gold `#CCA26C`, Champagne `#FCDDA1`, white reading surfaces.
- Supporting surfaces: Ice Blue `#EAF3FF`, Warm Cream `#FFF7EB`, Soft Mint `#EAF9F3`, Lavender `#F1EDFF`, Sky `#DCEEFF`.
- Dark mode maps semantic tokens independently. Bright raster artwork is gently dimmed while text is rendered above its own readable surface.
- Existing Roboto with Vietnamese support; weights 400–700. No extra font family.
- Text scale 11/12/14/15/16/20/24/32/40. Small text is metadata; questions/inputs use 15–16px.
- Spacing: 4/8/12/16/24/32/40/48. Radii: 10/14/20/26.
- Reading cards have quiet borders; dashboard cards have subtle layered shadows. Gold is an accent, not a body-text color on white.

## Layout

- Desktop: fixed left navigation (236px, 212px on smaller laptops), 82px sticky header; fluid main content with a 1504px cap.
- Main library: compact illustrated test rows plus a useful right rail. Three level cards above the library use consistent illustrations.
- Overview: real draft in the hero when available; submitted/draft/completed/best stats; level choices, history and recent-result widgets.
- Tablets at 1000px and below: sidebar becomes a native modal drawer.
- Mobile: stacked hero, level cards and right rail. Filters wrap without horizontal overflow. All operational touch targets are at least 40–44px; primary actions 44–48px.
- Exam: focused full-width workspace, compact English header and on-demand navigation. No decorative animation behind reading/listening work.
- Admin/teacher: a server-authorized activity list with student/status filters, pagination, view-result controls. Teachers see assigned students only; admin can see registered guest attempts.

## Motion

- Press 140ms, hover 190ms, card lift 220ms; easing `cubic-bezier(.23,1,.32,1)`.
- Hover lift only for a fine pointer with actual hover. Buttons use subtle 0.98 press feedback.
- Keyboard navigation has instant transitions; focus is retained across same-screen state changes. Navigation focuses main content for keyboard users.
- No perpetual ambient loop, scroll reveals, WebGL, spring library, timer-based decoration or large blur.
- Reduced motion disables movement. Native dialogs and details provide predictable focus and Escape behavior.

## Data / accessibility / performance

- Summary counts exclude removed or old-version tests; retries do not inflate completed-test counts. A zero score is valid; missing scores use a dash. Failed history fetches show a retry state.
- Never expose private answers in public-data. AI Writing stays separate from Reading/Listening totals.
- Reuse the existing optimized WebP/srcset pipeline, explicit intrinsic sizes, lazy-load below-the-fold images and eagerly request the hero illustration.
- SVG icons share one stroke style and have decorative aria-hidden attributes. Icon controls have accessible labels. Forms have visible labels.
- Main-content skip link, visible focus, native dialog drawer, native account details, status text plus icons, reduced motion.
- No database schema change. New staff activity endpoint is read-only and enforces existing class membership.

## Validation limits

Automated scoring, auth, permissions, teacher scope, summaries, search and media tests are required. Browser checks at 320/375/768/1024/1440px, both themes, keyboard and reduced-motion are also required when Browser use is enabled. Do not claim measured LCP/CLS/INP targets or completed visual QA without browser measurements.
