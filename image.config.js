/**
 * Image pipeline configuration.
 *
 * Sources:  src/assets/images/  (committed)
 * Output:   src/assets/img/     (generated, git-ignored; Vite fingerprints it on build)
 */
export default {
  /** Widths to generate, in CSS pixels. Widths larger than the source are skipped. */
  widths: [640, 1024, 1600, 2000],

  /** Modern formats, best first. A fallback in the source format is always produced too. */
  formats: ['avif', 'webp'],

  /** Encoder quality per format. Lower = smaller file. */
  quality: {
    avif: 55,
    webp: 78,
    jpeg: 82,
    png: 90,
  },

  /** Per-file overrides, keyed by the source path relative to src/assets/images/. */
  overrides: {},
}
