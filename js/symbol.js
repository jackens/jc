/**
 * Helper for creating `<symbol>` elements.
 */

import { $ } from './$.js'
import { NAMESPACE_SVG } from './common.js'

/**
 * @param {import('./common.js').$CONFIG} config
 * @returns {import('./common.js').$E<SVGSymbolElement>}
 */
export const symbol = config => $({ ...config, t: 'symbol', n: NAMESPACE_SVG }).e
