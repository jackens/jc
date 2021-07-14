/**
 * Set of data manipulation helpers.
 *
 * - `arr`: Array from tagged template literal.
 * - `a2o`: Array to object.
 * - `obj`: Object from tagged template literal.
 * - `get`: Helper similar to ? operator. (Elvis operator) for easy accessing nested object values.
 * - `set`: Helper similar to ? operator. (Elvis operator) for easy assigning values to nested objects.
 * - `oop`: Object Oriented Programming helper.
 */

import { CREATE, KEYS } from './common.js'
import { _in } from './_in.js'

/**
 * @param {[TemplateStringsArray, ...any[]]} params
 * @returns {string[]}
 */
export const arr = (...params) => String.raw.apply(0, params).trim().split(/\s+/)

/**
 * @param {any[]} arrayOfValues
 * @param {import('./common.js').MAP<any>} result
 * @param {string} key
 * @param {number} index
 * @returns {import('./common.js').MAP<any>}
 */
const _a2o = (arrayOfValues, result, key, index) => (result[key] = arrayOfValues[index], result) // eslint-disable-line no-return-assign,no-sequences

/**
 * @param {any[]} arrayOfValues
 * @returns {(result: import('./common.js').MAP<any>, key: string, index: number) => import('./common.js').MAP<any>}
 */
export const a2o = arrayOfValues => _a2o.bind(0, arrayOfValues)

/**
 * @param {[TemplateStringsArray, ...any[]]} params
 * @returns {import('./common.js').MAP<string>}
 */
export const obj = (...params) => arr.apply(0, params).reduce(a2o([]), CREATE(null))

/**
 * @param {object} ref
 * @param {string[]} keys
 * @returns {object | undefined}
 */
export const get = (ref, ...keys) => {
  for (const key of keys) {
    if (!_in(key, ref)) {
      return
    }
    ref = ref[key]
  }
  return ref
}

/**
 * @param {object} ref
 * @param {string[]} keys
 * @returns {object | undefined}
 */
export const set = (ref, ...keys) => {
  for (const key of keys) {
    if (!_in(key, ref)) {
      ref[key] = CREATE(null)
    }
    ref = ref[key]
  }
  return ref
}

/**
 * @param {import('./common.js').MAP<(...params: any[]) => any>} mapOfMethodsToBind
 * @param {any[]} paramsToBind
 * @returns {import('./common.js').MAP<(...params: any[]) => any>}
 */
export const oop = (mapOfMethodsToBind, ...paramsToBind) => {
  const keys = KEYS(mapOfMethodsToBind)
  const arrayOfBindedMethods = keys.map(key => mapOfMethodsToBind[key].bind(0, ...paramsToBind))
  return keys.reduce(a2o(arrayOfBindedMethods), CREATE(null))
}
