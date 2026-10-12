# Agentive

Landing page for Agentive, a fictional SaaS platform for automating workflows, built from a
Figma Community design.

**Live:** <https://agentive.netlify.app/>

## How it is built

- One HTML file bundled with [Vite](https://vite.dev/). No framework and no template
  engine.
- Plain CSS. Cascade layers (`@layer`) decide which rule wins, so selectors stay flat and
  short; native nesting; custom properties for the colours, sizes and shadows the design
  repeats.
- Very little JavaScript (about 1 kB gzipped): the menu, the billing switch, the video
  dialog and the header's shadow on scroll. Without it the page still reads and every link
  works.
- Images are resized and converted at build time from the sources in `src/assets/images/`.

## Running it

Needs Node 24 or newer.

```bash
npm install
npm run dev      # development server
npm run build    # production build in dist/
npm run preview  # serve dist/ locally
npm run check    # ESLint, Stylelint and Prettier
```

## Browser support

Vite's default target,
[Baseline Widely available](https://web.dev/baseline): features that have worked in
Chrome, Edge, Firefox and Safari for at least two and a half years. The build adds vendor
prefixes and flattens CSS nesting for that target.

## Matching the design

The page follows the design 1:1 at its three frames (1440, 768 and 390 px) and adapts in
between. Colours are kept as drawn, including several text colours with less contrast than
WCAG AA asks for.

The footer links and the buttons on the pricing plans are placeholders (`href="#"`): there
are no pages behind them.

## Credits

- Design: the [Agentive landing page template](https://www.figma.com/community/file/1631269295568460131)
  by Auric Studio, Figma Community, licensed under
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Changes: the company names in
  the “Trusted by” row and in the testimonials are invented, the testimonial portraits are
  replaced with initials, and a typo in one label is fixed.
- Fonts: Inter and Bricolage Grotesque, SIL Open Font License 1.1. The licence texts are in
  `src/assets/fonts/`.
- Third-party product names and logos (Gmail, Slack, Notion, HubSpot, Drive, Sheets, Zapier)
  belong to their owners. They appear as in the original design kit and imply no
  affiliation.
