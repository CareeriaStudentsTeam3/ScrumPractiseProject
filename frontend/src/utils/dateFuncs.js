export const formatStartDate = (date) => {
  const wd = new Date(date).toLocaleDateString('fi-FI', {
    weekday: 'short',
    // timeZone: 'UTC',
  })
  const d = new Date(date).toLocaleDateString('fi-FI')
  const t = new Date(date).toLocaleTimeString('fi-FI', {
    hour: 'numeric',
    minute: 'numeric',
    // timeZone: 'UTC',
  })
  return `${wd} ${d} ${t}`
}

export const formatEndDate = (date) => {
  const t = new Date(date).toLocaleTimeString('fi-FI', {
    hour: 'numeric',
    minute: 'numeric',
    // timeZone: 'UTC',
  })
  return t
}
