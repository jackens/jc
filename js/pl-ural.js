/**
 * Helper for choosing the correct singular and plural form for Polish (but not only!)
 */

/**
 * @param {number} value
 * @param {string} singular
 * @param {string} plural2
 * @param {string} plural5
 * @param {string?} noValue1
 * @param {string?} noValue
 * @returns {string}
 */
export const plUral = (value, singular, plural2, plural5, noValue1, noValue) => {
  const absValue = Math.abs(value)
  const absValueMod10 = absValue % 10
  return value === 1
    ? noValue1 || noValue
        ? singular
        : `${value} ${singular}`
    : !(absValue === 12 || absValue === 13 || absValue === 14) && (absValueMod10 === 2 || absValueMod10 === 3 || absValueMod10 === 4)
        ? (noValue ? plural2 : `${value} ${plural2}`)
        : (noValue ? plural5 : `${value} ${plural5}`)
}
