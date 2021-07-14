/**
 * Helper for creating `<style>` elements.
 */

import { $ } from './$.js'
import { js2css } from './js2css.js'

/**
 * @param {import('./common.js').JS2CSS} style
 * @returns {HTMLStyleElement}
 */
export const style = style => $({
  t: 'style', i: [{ e: js2css(style) }]
}).e
