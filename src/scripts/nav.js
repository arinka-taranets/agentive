/**
 * Mobile navigation — APG Disclosure Navigation Menu.
 * The button toggles aria-expanded; CSS shows the panel from that state.
 * Escape closes and returns focus to the button; so does leaving the menu.
 */
const DESKTOP = window.matchMedia('(width >= 64rem)')

export function initNav() {
  const nav = document.querySelector('[data-nav]')
  if (!nav) return

  const toggle = nav.querySelector('[data-nav-toggle]')
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true'
  const setOpen = (open) => toggle.setAttribute('aria-expanded', String(open))

  toggle.addEventListener('click', () => setOpen(!isOpen()))

  nav.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false)
      toggle.focus()
    }
  })

  // A chosen link scrolls the page; the panel would otherwise cover the target.
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false)
  })

  nav.addEventListener('focusout', (event) => {
    if (isOpen() && !nav.contains(event.relatedTarget)) setOpen(false)
  })

  document.addEventListener('pointerdown', (event) => {
    if (isOpen() && !nav.contains(event.target)) setOpen(false)
  })

  DESKTOP.addEventListener('change', () => setOpen(false))
}
