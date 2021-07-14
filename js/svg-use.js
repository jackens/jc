/**
 * Helper for creating `<svg><use>` elements.
 */

import { ASSIGN } from './common.js'

/**
 * @param {string} id
 * @param {import('./common').$CONFIG} config
 * @returns {import('./common').$CONFIG}
 */
export const svgUse = (id, { a, k } = {}) => ASSIGN({
  t: 'svg',
  i: [{
    t: 'use', a: { 'xlink:href': '#' + id }
  }]
}, a !== undefined ? { a } : {}, k !== undefined ? { k } : {})
