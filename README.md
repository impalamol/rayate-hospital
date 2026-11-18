# Rayate Hospital & Maternity Home — website

Multipage static website (HTML5 + Bootstrap 6 alpha + custom CSS + vanilla ES-module JS).
No build step is needed to run it. Upload the folder to any web host, or open it through XAMPP at
`http://localhost/rayate-hospital/`.

```
index.html  about.html  doctors.html  services.html  gallery.html  contact.html
404.html    privacy.html  terms.html
assets/css/style.css        design tokens (light + dark) + all components
assets/js/main.js           fixed header, back-to-top, menu, dialogs, reveal, counters, marquee,
                            carousels, filters, lightbox
assets/js/i18n.js           ALL website text (Marathi + English) + language switcher
assets/js/theme.js          light / dark mode toggle
assets/js/appointment.js    appointment form, validation, WhatsApp message
assets/img/                 logo, favicon, photos/, gallery/
sitemap.xml  robots.txt  .htaccess
```

---

## 1. Before going live: the placeholder checklist

The site currently shows **realistic sample data** so it looks finished (address *Plot No.7, near Parksyde Nest Panchavati, opposite Rasbihari International School, Panchavati, Hanuman Nagar, Nashik*, OPD *Mon–Sat 10–2 & 6–9*, email *info@rayatehospital.in*, *5,000+ families*, *4.9 rating / 320+ reviews*, Dr. Priya *12+ years*, sample testimonials). **Every one of these must be replaced with the hospital's real details before launch.** Developer-only notes in the code are still marked `[placeholder]`. The table shows where each value lives:

| What | Where |
|---|---|
| New premises address | `i18n.js` → `ct.addr.v`; JSON-LD `streetAddress` in each page's `<head>` |
| OPD days & timings | `i18n.js` → `fact.days.v`, `fact.time.manoj`, `fact.time.priya`, `ct.time.v` |
| Email | `i18n.js` → `ct.email.v` |
| Happy families / deliveries count | `i18n.js` → `home.hero.proof`; `index.html` → `data-count="1000"` |
| Dr. Priya's experience, Panchakarma | `i18n.js` → `fact.exp.priya`, `dr.priya.e8` |
| Sunday closed? | `appointment.js` → `closedDays` and `i18n.js` → `err.closed` |
| Testimonials (currently sample text) | `i18n.js` → `testi.1` … `testi.6`, then remove the `testi.flag` badge |
| Real photos | see section 4 |
| Domain name | `rayatehospital.in` in every page `<head>`, `sitemap.xml`, `robots.txt` |
| Share image | add `assets/img/og-image.jpg` (1200 × 630) |
| Google Map pin | `contact.html` → the `<iframe src="…q=…">` |
| Instagram, X, YouTube profile URLs | `SOCIALS` list in the page builder, or find & replace `https://www.instagram.com/`, `https://x.com/`, `https://www.youtube.com/` in all `.html` files (footer on every page + contact card). Facebook is already the real page. Remove any network the hospital does not use. |
| Privacy / Terms text | `i18n.js` → `pv.*`, `tm.*` (have it reviewed before publishing) |

---

## 2. Editing text and translations

**All visible text lives in `assets/js/i18n.js`.** Each line holds both languages side by side:

```js
'nav.about': ['आमच्याबद्दल', 'About'],
//            Marathi        English
```

1. Find the text you want to change (Ctrl+F in `i18n.js`).
2. Edit the Marathi and/or English string. Keep the quotes, and write `\'` for an apostrophe inside English text.
3. Save and refresh the browser. Every page updates.

How the HTML connects to it:

- `data-i18n="key"` sets the element's text.
- `data-i18n-html="key"` sets the element's HTML. This is used for headings with a gradient word: `<em class="grad-text">…</em>`.
- `data-i18n-attr="placeholder:key;aria-label:key2"` sets attributes such as placeholders, alt text and aria-labels.
- Page `<title>` and meta description come from `meta.<page>.title` and `meta.<page>.desc`. The page name is set by `<html data-page="…">`.

The HTML files already contain the English text, so the site reads correctly for search engines and without JavaScript. When a page loads, `i18n.js` replaces that text with whichever language is active. The dictionary is always the source of truth.

**Adding new text:** add a key to `i18n.js`, then put `data-i18n="your.key"` on the element.

English is the default (the HTML files contain the English text). A visitor's choice is saved in the browser (`localStorage`, key `rayate-language`).

---

## 3. Phone numbers, WhatsApp and timings

| Item | File(s) |
|---|---|
| Phone numbers `8605332363` / `7588569555` | All `.html` files: find & replace `8605332363` / `86053 32363` (and the same for the second number) |
| WhatsApp numbers (per doctor) | `assets/js/appointment.js` → `APPT_CONFIG.whatsapp`: `hospital`, `manoj`, `priya` (country code, digits only). Also the `wa.me/91…` links in the HTML |
| Emergency number | Same as the main number. Search for `86053 32363` |
| Closed days for bookings | `appointment.js` → `closedDays: [0]` (0 = Sunday … 6 = Saturday; `[]` = open every day) |
| OPD timings text | `i18n.js` → `ct.time.v`, `fact.*` keys |

Header, footer, floating buttons and the appointment popup are **identical blocks repeated in every page**. If you change a link or number in one, use find & replace across all `.html` files.

---

## 4. Photos

The site uses a few free stock photos (Unsplash) and SVG placeholders for the gallery. Replace both with the hospital's own photos when available. To add a photo:

1. Export as **WebP** at roughly 1600 px on the long side (quality 75–80). Free tool: [squoosh.app](https://squoosh.app).
2. Save with a clear name in the matching folder, e.g. `assets/img/gallery/labour-room.webp`.
3. Update the `src` (and `data-full` for the gallery) in the HTML, and keep `width`/`height` matching the photo's proportions (this prevents layout jumps).
4. Keep `loading="lazy"` on every image except the homepage hero photo.

| Image | Used in | Source |
|---|---|---|
| `photos/mother-baby-hero.webp` | Home hero | Unsplash — Rohit Dey |
| `photos/mother-baby-window.webp` | Home services card, avatars | Unsplash — Rohit Dey |
| `photos/mother-baby-white.webp` | Home "Why choose us", About story | Unsplash — Rashmi Kalburgie |
| `photos/about-hero.webp` | About hero | Pexels (photo 10956983, supplied by the client) |
| `photos/mother-newborn-saree.webp` | Avatars | Unsplash — Amit Ranjan |
| `photos/newborn-feet.webp` | Services hero | Unsplash — Vishnu R Nair |
| `photos/cta-mother.webp` | "Your family's care starts here" band (every page) | Unsplash (photo-1701839640200, supplied by the client) |
| `gallery/g01–g12.svg` | Gallery, About teaser, Gallery hero | Placeholders |

Unsplash photos are free to use under the [Unsplash License](https://unsplash.com/license). Credit is appreciated but not required.

**Doctor photos:** the doctor cards currently show the initials "MR" and "PR". When portraits are ready, put an `<img>` inside `.mono` (homepage) and `.profile-panel` (doctors page).

**Gallery categories:** each item has `data-cat="building | rooms | ot | nicu | events"`. The caption comes from the `gal.N` key in `i18n.js`. To add a photo, copy an existing `<button class="masonry-item">` block and add a new `gal.13` key.

Use only photos the hospital owns, with consent from any patient who appears in them.

---

## 5. Appointment booking

- Every "Book Appointment" button (`data-book`) opens the popup form. Add `data-doctor="manoj"` or `data-doctor="priya"` to pre-select a doctor.
- `contact.html?doctor=priya#appointment` pre-selects a doctor on the contact page form.
- On submit, the form checks the name, a 10-digit Indian mobile (starting 6–9) and the date (no past dates, no closed days).
- It then opens WhatsApp **to the doctor chosen in the form**: Dr. Manoj → `APPT_CONFIG.whatsapp.manoj`, Dr. Priya → `.priya`, "Any doctor" → `.hospital`. **[confirm]** which number belongs to which doctor; currently Dr. Manoj = 8605332363 and Dr. Priya = 7588569555.
- The message has a greeting, then one line per field written as `Form label - Input`, using the form's own labels in the visitor's language. For example:

  ```
  Hello Rayate Hospital, I would like to book an appointment:

  Patient name - Asha Patil
  Mobile number - 9876543210
  Doctor - Dr. Priya Rayate – Ayurveda & Family Medicine
  Visit type - Ayurveda consultation
  Preferred date - Monday, 19 October 2026
  Preferred time slot - Morning
  Message - Joint pain for 2 weeks
  ```
- **Future backend:** `appointment.js` contains a `// TODO: backend hook` where a PHP/email endpoint can receive the same data.

---

## 6. Design system

All colours, fonts and spacing are CSS variables at the top of `assets/css/style.css`:

- Neutrals: `--white`, `--soft` (lavender section tone), `--ink` / `--ink2` / `--ink3` (text), `--line`.
- Brand: `--brand #C2185B` (buttons, panels), `--violet #6A3FB5`, `--mint` (small "available" accents), `--gold` (stars). `--panel` is the rose gradient used for the big panels. To change the main colour, edit `--brand` and `--panel`.
- Marathi automatically switches to Baloo 2 / Mukta, with taller line-height and no negative letter-spacing.

**Bootstrap 6 notes**
- Responsive classes use the v6 prefix style: `d-none lg:d-flex`, `md:col-6`, `xl:d-none`.
- Our component styles sit inside Bootstrap's `@layer custom`, so Bootstrap utilities (`d-none`, `md:d-inline-flex` …) always win. Design tokens stay un-layered so they override Bootstrap's `--bs-*` variables.
- Modals use native `<dialog>` with Bootstrap's `.dialog` styles. Bootstrap's JS bundle is not loaded because nothing needs it. If you add Bootstrap JS components later, import them as ES modules (example in `main.js`).

**Page structure:** every section follows `section.sec.<name> > .container > .row > columns`. Sections inside `<main>` alternate white and soft backgrounds automatically (odd/even). Cards use `--card-bg`, which is always the opposite tone. The call-to-action band (`.sec.cta`) is always rose. Adding or removing a section re-flows the colours on its own.

**Header:** `.site-header` is fixed at the top on every page (height `--header-h`). It gains a bottom border and soft shadow once you scroll. From 1024px it shows all links (Home … Contact), the language switch, the theme toggle and Book Appointment. Between 1024 and 1279px the Book button is icon-only so everything fits. Below 1024px the links move into the hamburger menu. The floating buttons are back-to-top (appears after 600px), WhatsApp and Call. On the homepage, WhatsApp and Call stay hidden while the hero is in view, because the hero has its own.

**Light / dark mode:** light is the default. The sun/moon button in the header (and in the mobile menu) switches theme; the choice is saved in `localStorage` (`rayate-theme`) and applied by the inline `<head>` script before first paint. Colours are `light-dark(light, dark)` pairs at the top of `style.css`: `--white`, `--soft`, `--surface`, `--glass`, `--inverse`, `--ink*`, `--line*`, `--brand-text`. The rose panels look the same in both themes.

---

## 7. Hosting notes

- `.htaccess` enables the custom 404 page, compression and caching on Apache hosts. If the site lives in a sub-folder (e.g. XAMPP `/rayate-hospital/`), change `ErrorDocument 404 /404.html` to `/rayate-hospital/404.html`.
- After going live, submit `sitemap.xml` in Google Search Console and claim or update the **Google Business Profile**. For local searches ("maternity hospital Nashik", "gynaecologist Nashik", "Ayurveda doctor Nashik"), this matters as much as the website.
- Fonts load from Google Fonts and Bootstrap CSS from jsDelivr (pinned to `6.0.0-alpha.1` with an integrity hash). Bootstrap 6 is still alpha. Re-test before upgrading.
