# Colour and depth refinement

Approved request: make the Cambridge workspace more colourful, add image backgrounds as useful, strengthen card frames/shadows like the supplied reference, and correct the sidebar alignment.

UI/UX Pro Max query `claymorphism educational cards --domain style` returned the active Claymorphism style: refined pastel surfaces, thick borders and layered shadows. Adapt to the actual reference with a 2px outline and 4–5px bottom shadow, rather than a 4px heavy frame. Keep short existing motion and no new animation library.

- Add a blue/mint/lavender canvas using inexpensive static CSS gradients.
- Four statistic cards use blue, mint, lavender and champagne surfaces. Each uses the same vertical icon/value/title structure and consistent minimum height.
- Keep brand primary #004AAD and gold #CCA26C. Define dark-theme equivalents separately.
- Sidebar note: dedicated 63–84px image panel, contained mascot, independent text panel. No negative top offsets over the copy.
- Sidebar account: avatar, name and accessible sign-out icon align in one contained row.
- Use two new built-in Imagegen assets: learning-world for the hero, study-corner for sidebar/recent-result artwork. Store the original PNGs in assets/design-20261024 and publish WebP/srcset variants.
- Hero image uses contain rather than crop, with independent text/image columns and a stacked layout on small screens.
- Neutral reading/answer fills remain in the exam, with modest 2px outlines and shallow bottom shadows.
- Prompts and provenance: assets/design-20261024/README.md. Image sizes: generated/design-20261024-report.json.

Browser use is disabled in Work settings at implementation time. Existing client/runtime and media checks validate markup/data/assets, not visual layout. Do not claim a completed browser review or measured Core Web Vitals.
