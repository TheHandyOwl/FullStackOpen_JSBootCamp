const { palindrome } = require('../utils/for_testing')

test.skip('palindrome of didudev', () => {
  const result = palindrome('midudev')

  expect(result).toBe('vedudim')
  // expect(result).toBe('')
})

test.skip('palindrome of empty string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})
