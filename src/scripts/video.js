// "Watch demo": the link goes to the video's page; with JS it plays in a dialog instead.
// The player is created when the dialog opens and removed when it closes, so the page asks
// the video host for nothing before the click and the sound stops with the dialog.
export function initVideo() {
  const dialog = document.querySelector('[data-video-dialog]')
  if (!dialog) return

  const frame = dialog.querySelector('[data-video-frame]')
  const title = dialog.querySelector('[data-video-title]')

  for (const link of document.querySelectorAll('[data-video]')) {
    link.addEventListener('click', (event) => {
      // A modified click opens the link in a new tab or window, as any link.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()

      const player = document.createElement('iframe')
      player.src = `https://www.youtube-nocookie.com/embed/${link.dataset.video}?autoplay=1`
      player.title = title.textContent.trim()
      player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'
      frame.replaceChildren(player)
      dialog.showModal()
    })
  }

  // The dialog's padding is zero: only a click on the backdrop has the dialog as target.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close()
  })

  dialog.addEventListener('close', () => frame.replaceChildren())
}
