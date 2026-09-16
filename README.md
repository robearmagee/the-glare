# The Glare

A responsive campaign website for smarter policy in Australia, starting with climate and the private jet fuel tax break. The invitation welcomes people's ideas and expertise as well as collective action.

## Current status

Pre-launch website at https://robearmagee.github.io/the-glare/ (GitHub Pages enabled; updates appear after the Pages build finishes). Email signup is visibly disabled: no addresses are collected or sent. The website has no analytics, tracking scripts, external fonts or build dependencies. The final campaign video has not yet been supplied for embedding. Nothing in this repository requires subscriber data or private credentials.

## Preview locally

From this folder, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. You can also open `index.html` directly. The page works without JavaScript; the small script opens the privacy disclosure when following the footer link.

## Files

- `index.html`: campaign copy, navigation, inactive signup layout, source links and direct actions.
- `styles.css`: responsive layout, typography, touch targets, focus states, print and reduced-motion behaviour.
- `site.js`: enhancement for the privacy link.
- `assets/`: optimised versions of the approved centred-jet illustration and a simple initial favicon.
- `.nojekyll`: serves these files directly through GitHub Pages.

Relative asset paths support the GitHub project address `/the-glare/` and a future custom domain. The image uses responsive WebP sources with a JPEG fallback. Phone layouts show the full illustration; wider layouts use a shallow crop centred on the jet.

## Before opening signup

1. Configure the organiser-controlled email provider and its supported form, consent record, confirmation process and unsubscribe flow. Replace the disabled form with the provider's integration; simply enabling the current fields will not make them work. Never add a private API key to these public files.
2. Identify the organiser and public contact route, and replace the preparation-stage privacy wording with the actual provider and data-handling details.
3. Test submission, confirmation, repeat signup, the promised first action and unsubscribe. The signup scope is campaigns for smarter Australian policy, starting with climate, including opportunities to contribute ideas and take action. Set up a genuine reply or feedback route before inviting ideas by email; no idea submission form is implemented on this page.
4. Add the selected final video if available, using a click-to-play embed with no automatic playback. The page does not depend on a video to explain the campaign.
5. Recheck current tax rates and recipient links. Remove the preparation banner, signup status and `noindex, nofollow` metadata when the public launch is ready.

## Publish on GitHub Pages

GitHub Pages is configured to publish from **main**, **/(root)**, with HTTPS enforced. Commit and push reviewed public website changes; GitHub rebuilds the site automatically. The address is `https://robearmagee.github.io/the-glare/`. Check the Pages build completes before expecting an update to be visible.

Keep workbooks, planning notes, original video files, credentials and subscriber exports outside this repository. A `.gitignore` is an additional precaution, not a replacement for reviewing what is committed.

## Responsive checks

Checked in an isolated Chromium-based browser on 16 September 2026 at widths 320, 360, 375, 390, 414, 600, 768, 820, 991, 992, 1024, 1280, 1440 and 1920 CSS pixels. Checked 200% text sizing at 320, 768 and 1280 pixels, keyboard skip navigation, disclosures, privacy-link behaviour, image loading, touch navigation target heights, and operation without JavaScript. No horizontal page overflow or missing local resources occurred. This is browser emulation, not testing on physical phones.

## Evidence

The page links directly to the ATO rate table, the excise tariff legislation, the indexed rate notice and the Parliamentary Budget Office explanation. Figures distinguish domestic aviation excise from other taxes and credit arrangements. The campaign's judgement about fairness is separate from those factual claims. Source and recipient checks were last performed on 16 September 2026; recheck before publication.
