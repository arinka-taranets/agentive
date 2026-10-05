/** Settings for scripts/generate-images.mjs. */
export default {
  /** Widths to generate, in CSS pixels. Widths larger than the source are skipped. */
  widths: [640, 1024, 1600, 2000],

  /** Modern formats, best first. */
  formats: ['avif', 'webp'],

  /** Also produce a fallback in the source format, for <picture>'s <img>. */
  fallback: true,

  /** Encoder quality per format. Lower = smaller file. */
  quality: {
    avif: 55,
    webp: 78,
    jpeg: 82,
    png: 90,
  },

  // Per-file overrides, keyed by the source path relative to src/assets/images/. CSS
  // backgrounds ship as WebP only: picking a format needs image-set(type()), which is
  // newer than the browser target.
  overrides: {
    // Shown 1:1 (tile scale 1 in the design).
    'textures/noise-dark.png': { widths: [160], formats: ['webp'], fallback: false },
    // Shown at 0.3 scale (307px tile); 614 keeps it sharp at 2x.
    // Grey = colour x alpha of the original, which is what an additive blend adds.
    'textures/noise-light.png': { widths: [614], formats: ['webp'], fallback: false },

    // Shown at 13–18px inside the mock-ups; twice the largest size keeps them sharp at 2x.
    // Too small for a <picture>: one WebP of about 1 KB.
    'icons/gmail.png': { widths: [32], formats: ['webp'], fallback: false },
    'icons/chart.png': { widths: [36], formats: ['webp'], fallback: false },
    'icons/outreach.png': { widths: [36], formats: ['webp'], fallback: false },
  },
}
