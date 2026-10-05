// Header line and shadow. In the 768 and 1440 frames the first section covers them at the
// top of the page; CSS hides them there until data-scrolled is set.
export function initHeader() {
  const header = document.querySelector('[data-header]')
  if (!header) return

  const update = () => header.toggleAttribute('data-scrolled', window.scrollY > 0)
  update()
  window.addEventListener('scroll', update, { passive: true })
}
