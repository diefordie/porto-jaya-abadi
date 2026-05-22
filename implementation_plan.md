# Implementation Plan - Modular Refactoring of Langgan Jaya Abadi Website

This plan details the technical approach to refactoring the monolithic single-file company profile website (`langgan_jaya_abadi_website_9.html`) into a clean, modular, and maintainable multi-page architecture.

All design layouts, styles, animations, SEO tags, responsive behaviors, and the multi-language translation system (ID/EN) will be **100% preserved**.

---

## Proposed Directory Structure

We will structure the project as follows:

```
d:\ordinary life's\JOKI TUGAS\WEB YOHAN\
├── index.html                      # Main landing page (fully modularized)
│
├── assets/
│   ├── css/
│   │   ├── main.css                # Variables, scroll-behavior, resets, global typography, scrollbars, utility gradients
│   │   ├── components.css          # Navbar, Hero, Services, Portfolio, Stats, Testimonials, FAQ, Contact Form, Footer
│   │   └── animations.css          # Keyframes and animation classes (@keyframes, .bar-fill, .float-badge, .pulse-dot)
│   │
│   ├── js/
│   │   ├── navbar.js               # Mobile menu toggle & sticky scroll effects
│   │   ├── language.js             # Multi-language translation engine
│   │   ├── services.js             # Interactive service tabs active state selector
│   │   ├── faq.js                  # Accordion FAQ click event listeners
│   │   └── main.js                 # DOM initialization, progress bar trigger observer, portfolio filters, contact submit
│   │
│   └── images/
│       ├── hero/
│       ├── services/
│       ├── portfolio/              # Saved decoded portfolio JPEG files
│       │   ├── steel_structure_kalimantan.jpg
│       │   ├── tank_fabrication_sumatra.jpg
│       │   ├── plant_shutdown_sulawesi.jpg
│       │   ├── industrial_access_bridge.jpg
│       │   ├── precision_components.jpg
│       │   └── offshore_platform_repair.jpg
│       └── clients/
│
└── pages/
    ├── about.html                  # Sub-page dedicated to the "About Us" section
    ├── services.html               # Sub-page dedicated to the "Our Services" section
    ├── portfolio.html              # Sub-page dedicated to the "Portfolio" section
    └── contact.html                # Sub-page dedicated to the "Contact Us" section
```

---

## User Review Required

> [!IMPORTANT]
> **1. Handling Inline Event Handlers and Script Loading**
> The original monolithic HTML relies heavily on inline event handlers (e.g., `onclick="toggleMenu()"`, `onclick="setLang('en')"`, `onclick="selectService(0, this)"`, `onsubmit="handleSubmit(event)"`). 
> To ensure compatibility and absolute functional robustness without rewrite:
> - The refactored JavaScript files will be loaded via traditional `<script>` tags with `defer` attributes.
> - Top-level handlers (`toggleMenu`, `setLang`, `selectService`, `handleSubmit`) and global state (`currentLang`) will be bound explicitly to the `window` object (e.g., `window.setLang = setLang;`) to make them globally accessible from the HTML inline attributes.
>
> **2. Multi-Page Navigation Pathing**
> - The root `index.html` links to sub-pages inside `pages/` (e.g. `href="pages/services.html"`).
> - Sub-pages inside `pages/` link to assets and other pages using relative relative paths:
>   - Stylesheet references: `href="../assets/css/main.css"`
>   - Script references: `src="../assets/js/main.js"`
>   - Image source references: `src="../assets/images/portfolio/steel_structure_kalimantan.jpg"`
>   - Navigation linking: Home points to `../index.html`, and other sub-pages link directly (e.g., `href="services.html"`).

---

## Proposed Changes

### CSS Modularization

We will split the CSS style block into three stylesheets:

#### 1. [NEW] [main.css](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/assets/css/main.css)
- Contains color palette variable declarations in `:root`.
- Smooth scroll behavior settings (`html { scroll-behavior: smooth; }`).
- Body fonts, displays, typography, and default layout elements.
- Webkit-scrollbar styling overrides.
- Utilities such as text gradients (`.text-gradient`, `.text-gold`) and `.grid-pattern` background layer.

#### 2. [NEW] [components.css](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/assets/css/components.css)
- Contains layout classes like `.metal-texture` and `.hero-bg`.
- Diagonal section dividers (`.diagonal-top`, `.diagonal-bottom`).
- Header & sticky navbar states.
- Hover-scale transitions for cards (`.card-hover`, `.service-card:hover`).
- Structure and tabs for the service showcase (`.service-tab`, `.svc-preview-wrap`, `.service-tabs-mobile`, `.service-tab-mobile`).
- Scroll layout configurations for testimonials (`.testimonial-scroll`, `.testimonial-card`).
- Open/closed transition states for the FAQ accordion items.

#### 3. [NEW] [animations.css](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/assets/css/animations.css)
- Progress bar transition styling: `@keyframes fillBar` and the active class `.bar-fill`.
- Floating badge bouncing keyframes: `@keyframes floatUp` and active class `.float-badge`.
- Green pulse circle keyframes: `@keyframes pulse-ring` and active class `.pulse-dot`.

---

### JavaScript Modularization

We will split the script block into four component files and one orchestrator file:

#### 4. [NEW] [navbar.js](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/assets/js/navbar.js)
- Implements mobile menu expansion toggle function (`toggleMenu()`).
- Attaches the window scroll listener to add dynamic shadow overlays to the navbar when the page is scrolled down.

#### 5. [NEW] [language.js](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/assets/js/language.js)
- Houses the translation switcher system (`setLang(lang)`) and language tracker state (`window.currentLang`).
- Queries elements containing translation metadata attributes (`data-en` / `data-id` / `data-id-text`) and swaps their text content dynamically.

#### 6. [NEW] [services.js](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/assets/js/services.js)
- Implements tab switching inside the interactive showcase (`selectService(index, clickedBtn)`).
- Updates CSS class active flags for mobile buttons, desktop buttons, and preview cards.

#### 7. [NEW] [faq.js](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/assets/js/faq.js)
- Implements the accordion collapse toggles for the Frequently Asked Questions.

#### 8. [NEW] [main.js](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/assets/js/main.js)
- Attaches standard dynamic features on DOM load:
  - Portofolio grid filter category controls.
  - IntersectionObserver to start progress bar animations when the "About" section comes into view.
  - Contact form submissions interceptor (`handleSubmit(e)`).

---

### HTML Reconstruction

#### 9. [MODIFY] [index.html](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/index.html)
- Fully stripped of inline `<style>` and `<script>` blocks.
- References modular css stylesheets in the `<head>` and javascript modules at the bottom of the body.
- Replaces base64 image strings with clean asset references (`assets/images/portfolio/...`).
- Navigation links updated to redirect to section sub-pages (e.g. `pages/services.html`).

#### 10. [NEW] [about.html](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/pages/about.html)
- Displays a dedicated layout focused on "About Us", maintaining consistent header/footer visual styles, SEO metadata, translation configurations, and scripts.

#### 11. [NEW] [services.html](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/pages/services.html)
- Displays a dedicated layout focused on "Our Services" (with the interactive tabs showcase fully operational).

#### 12. [NEW] [portfolio.html](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/pages/portfolio.html)
- Displays a dedicated layout focused on the company "Portfolio" with fully working filters and externalized image paths.

#### 13. [NEW] [contact.html](file:///d:/ordinary%20life's/JOKI%20TUGAS%20/WEB%20YOHAN/pages/contact.html)
- Displays a dedicated layout focused on "Contact Us" with the contact form fully operational.

---

## Verification Plan

### Automated Tests
- We will verify that each created page has zero markup compilation errors and links are resolveable relative paths.
- We will start a local HTTP server inside the workspace to serve the pages and verify visual consistency.

### Manual Verification
- **Visual Audit**: Verify fonts (Barlow & Barlow Condensed), custom gradient overlays, and diagonal border lines are exact.
- **Interactive Check**: Click language switchers (ID/EN) on all pages to ensure translations work smoothly.
- **Service Tabs Showcase**: Click mobile pills and desktop tabs in the Services section to confirm the card fade transition works correctly.
- **FAQ Accordion**: Click items to verify smooth slide open/close.
- **Portfolio Filters**: Click "Semua", "Konstruksi", "Fabrikasi", and "Maintenance" to ensure correct real-time category filtering.
