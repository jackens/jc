/**
 * Helper for creating `<svg>` container elements.
 */

import { $ } from './$.js'
import { symbol } from './symbol.js'

/**
 * @param {Array<import('./common.js').$CONFIG | import('./common.js').$CONFIG[]>} params
 * @returns {import('./common.js').$E<SVGSVGElement>}
 */
export const svg = (...params) => $({
  t: 'svg',
  k: {
    style: { display: 'none' }
  },
  i: params.flat().map(config => ({ e: symbol(config) }))
}).e
