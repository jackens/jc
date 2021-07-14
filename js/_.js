/**
 * Language versioning helper.
 */

import { app } from './app.js'
import { get } from './elvis.js'

/**
 * @param {string} text
 * @param {string?} version
 * @returns {string}
 */
export const _ = (text, version) =>
  get(app.locales, app.lang, version, text) ?? get(app.locales, app.lang, text) ?? text
