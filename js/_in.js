/**
 * Replacement for the `in` operator (not to be confused with the `for-in` loop) that works properly.
 */

import { OBJECT } from './common.js'
import { _Number, _String } from './_typeof.js'

/**
 * @param {any} key
 * @param {any} map
 * @returns {boolean}
 */
export const _in = (key, map) => (_String(key) || _Number(key)) && OBJECT.hasOwnProperty.call(map ?? OBJECT, key)
