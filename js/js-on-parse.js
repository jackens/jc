/**
 * `JSON.parse` with “JavaScript turned on”.
 *
 * Objects having exactly one `«handlerName»` property present in the handlers map, i.e. objects of form:
 *
 * ```js
 * { "«handlerName»": «param» }
 * ```
 *
 * and
 *
 * ```js
 * { "«handlerName»": [«params»] }
 * ```
 *
 * are replaced by the result of call
 *
 * ```js
 * handlers['«handlerName»'](«param»)
 * ```
 *
 * and
 *
 * ```js
 * handlers['«handlerName»'](...«params»)
 * ```
 *
 * Remark. To pass to `handlers['"handlerName"]` a single argument that is an array, use the following form:
 *
 * ```js
 * { "«handlerName»": [[«elements»]] }
 * ```
 *
 * which will force a call
 *
 * ```js
 * handlers['«handlerName»']([«elements»])
 * ```
 */

import { IS_ARRAY } from './common.js'
import { _in } from './_in.js'
import { _Object } from './_typeof.js'

/**
 * @param {string} text
 * @param {import('./common.js').MAP<(...params: any[]) => any>} handlers
 * @returns {any}
 */
export const jsOnParse = (text, handlers) => JSON.parse(text, (key, value) => {
  if (_Object(value)) {
    let isSecondKey = false
    for (key in value) {
      if (isSecondKey) {
        return value
      }
      isSecondKey = true
    }
    if (_in(key, handlers)) {
      return IS_ARRAY(value[key])
        ? handlers[key](...value[key])
        : handlers[key](value[key])
    }
  }
  return value
})
