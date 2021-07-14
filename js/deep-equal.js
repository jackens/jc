/**
 * Helper that verifies deeply equality of two arguments of any type.
 * An iterative implementation that does not cause a stack overflow error.
 */

import { IS_ARRAY, EMPTY_STRING } from './common.js'
import { _typeof, _Object } from './_typeof.js'

/**
 * @param {any} actual
 * @param {any} expected
 * @returns {boolean}
 */
export const deepEqual = (actual, expected) => {
  const actualQueue = [actual]
  const expectedQueue = [expected]
  while (actualQueue.length) {
    const actual = actualQueue.shift()
    const expected = expectedQueue.shift()
    if (_typeof(actual) !== _typeof(expected)) {
      return false
    }
    if (IS_ARRAY(actual) && IS_ARRAY(expected)) {
      if (actual.length !== expected.length) {
        return false
      }
      for (let k = 0; k < actual.length; ++k) {
        actualQueue.push(actual[k])
        expectedQueue.push(expected[k])
      }
    } else if (_Object(actual) && _Object(expected)) {
      for (const k in actual) {
        if (!(k in expected)) {
          return false
        }
      }
      for (const k in expected) {
        if (!(k in actual)) {
          return false
        }
      }
      for (const k in actual) {
        actualQueue.push(actual[k])
        expectedQueue.push(expected[k])
      }
    } else if (EMPTY_STRING + actual !== EMPTY_STRING + expected) {
      return false
    }
  }
  return true
}
