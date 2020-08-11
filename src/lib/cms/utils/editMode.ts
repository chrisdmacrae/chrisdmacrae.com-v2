export const enterEditMode = () => {
  return fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname
  })
}

export const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}