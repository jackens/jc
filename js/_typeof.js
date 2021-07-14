/**
 * Set of type testing helpers.
 */

import { DOCUMENT } from './common.js'

const toString = {}.toString

/**
 * Replacement for the `typeof` operator that works properly.
 * @param {any} arg
 * @returns {string}
 */
export const _typeof = arg => toString.call(arg).slice(8, -1)

/**
 * Helper that checks if the `arg` is of type `Boolean`.
 * @param {any} arg
 * @returns {boolean}
 */
export const _Boolean = arg => _typeof(arg) === 'Boolean'

/**
 * Helper that checks if the `arg` is of type `Element`.
 * @param {any} arg
 * @returns {boolean}
 */
export const _Element = arg => arg?.nodeType === DOCUMENT.ELEMENT_NODE

/**
 * Helper that checks if the `arg` is of type `HTMLButtonElement`.
 * @param {any} arg
 * @returns {boolean}
 */
export const _HTMLButtonElement = arg => _typeof(arg) === 'HTMLButtonElement'

/**
 * Helper that checks if the `arg` is of type `HTMLInputElement`.
 * @param {any} arg
 * @returns {boolean}
 */
export const _HTMLInputElement = arg => _typeof(arg) === 'HTMLInputElement'

/**
 * Helper that checks if the `arg` is of type `HTMLTextAreaElement`.
 * @param {any} arg
 * @returns {boolean}
 */
export const _HTMLTextAreaElement = arg => _typeof(arg) === 'HTMLTextAreaElement'

/**
 * Helper that checks if the `arg` is of type `Number`.
 * @param {any} arg
 * @returns {boolean}
 */
export const _Number = arg => _typeof(arg) === 'Number'

/**
 * Helper that checks if the `arg` is of type `Object`.
 * @param {any} arg
 * @returns {boolean}
 */
export const _Object = arg => _typeof(arg) === 'Object'

/**
 * Helper that checks if the `arg` is of type `String`.
 * @param {any} arg
 * @returns {boolean}
 */
export const _String = arg => _typeof(arg) === 'String'

/**
 * Helper that checks if the `arg` is of type `Text`.
 * @param {any} arg
 * @returns {boolean}
 */
export const _Text = arg => arg?.nodeType === DOCUMENT.TEXT_NODE
