// Billing period: the switch flips aria-checked, and every price that carries both periods
// shows the one that is on. The numbers live in the markup.
export function initBilling() {
  const control = document.querySelector('[data-billing-switch]')
  if (!control) return

  const prices = document.querySelectorAll('[data-price-monthly]')

  control.addEventListener('click', () => {
    const annual = control.getAttribute('aria-checked') !== 'true'
    control.setAttribute('aria-checked', String(annual))
    for (const price of prices) {
      price.textContent = annual ? price.dataset.priceAnnual : price.dataset.priceMonthly
    }
  })
}
