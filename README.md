# The Glare

A responsive campaign website for smarter policy in Australia, starting with climate and the private jet fuel tax break.

## Website

https://robearmagee.github.io/the-glare/

GitHub Pages publishes the main branch from the repository root. The site uses plain HTML, CSS and JavaScript, with no build step. Relative asset paths work under `/the-glare/` or a future custom domain.

## Signup

The embedded form uses Brevo's supported HTML structure, official script and stylesheet, and Cloudflare Turnstile. Brevo manages the contact list and double confirmation process. Only a public Turnstile site key appears in source; private keys, subscriber lists and contact exports must stay outside this repository.

`site.js` adds native email/consent validation, accessible status handling and recovery from interrupted requests. A successful submission asks the visitor to check their inbox; it does not claim they are already subscribed. Failed requests preserve entries and never retry automatically. With scripts unavailable, the form stays disabled and offers a separate hosted-form link.

The privacy notice identifies the public campaign contact as theglare@robmagee.com.au and describes the roles of Brevo, Cloudflare and GitHub. There are no advertising pixels or additional audience analytics.

## Files

- `index.html`: campaign, signup form, source links and direct actions.
- `styles.css`: responsive layout, typography and provider form styling.
- `site.js`: signup behaviour and disclosure enhancements.
- `privacy.html`: public information-handling notice and contact route.
- `welcome.html`: branded destination after Brevo processes the email confirmation link.
- `assets/`: responsive artwork and favicon.

## Brevo configuration

After deployment, set `https://robearmagee.github.io/the-glare/welcome.html` as the confirmation page after clicking the email validation link. The email button itself must retain Brevo's native double opt-in link.

Keep the hosted Brevo form's privacy link and provider disclosure consistent with this website. Configure sender and reply addresses in Brevo, not in website code. The final welcome email is optional; avoid sending duplicate welcome messages through multiple workflows.

The confirmation email is still using a generic template. Customise it before promoting the campaign widely. The preparation banner and noindex metadata remain until final launch checks are complete.

## Preview and testing

Run `python3 -m http.server 8765 --bind 127.0.0.1` from this directory. Turnstile must allow the actual hostname; localhost is not automatically authorised. Campaign content and disclosures remain usable without JavaScript.

On 18 September 2026, automated browser checks passed at 14 widths from 320 to 1920 pixels, with 200% text at 320/768/1280. Tests covered invalid email, unchecked consent, missing CAPTCHA, provider rejection, successful submission, interrupted connections, unavailable scripts and no-JavaScript fallback. Privacy and welcome pages were checked at four widths. Automated submissions and CAPTCHA responses were intercepted, so those tests sent no emails.

One authorised real signup through the hosted Brevo form resulted in a received confirmation email. Full confirmation/list membership, the live embedded flow and unsubscribe require final checks. Browser emulation is not physical-device testing.

Before promoting the campaign, complete these checks, review the email template and tracking settings, recheck the dated evidence and minister links, and add the final video when available. Remove the preparation banner and noindex metadata once ready.
