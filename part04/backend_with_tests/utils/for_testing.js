const palindrome = (string) => {
  if (typeof string === 'undefined') return // Porque así lo hemos decidido hoy

  return string
    .split('')
    .reverse()
    .join('')
}

const average = array => {
  if (array.length === 0) return 0 // Porque así lo hemos decidido hoy

  // if (array.filter(item => typeof item.isNaN === 'undefined')) return

  let sum = 0
  array.forEach(num => { sum += num })
  return sum / array.length
}

module.exports = {
  palindrome,
  average
}
