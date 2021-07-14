/**
 * User Interface helpers.
 */

import { $ } from './$.js'
import { _Element, _HTMLButtonElement, _HTMLInputElement, _HTMLTextAreaElement } from './_typeof.js'

/**
 * @param {Element} e
 * @returns {import('./common.js').E<Element>}
 */
export const disable = e => $({ e, a: { disabled: true } })

/**
 * @param {Element} e
 * @returns {import('./common.js').E<Element>}
 */
export const enable = e => $({ e, a: { disabled: false } })

/**
 * @param {HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement} e
 * @returns {Array<HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement>}
 */
export const getInputs = e => {
  const result = []
  const queue = [e]

  while (queue.length) {
    const element = queue.shift()

    if (_HTMLInputElement(element) || _HTMLTextAreaElement(element) || _HTMLButtonElement(element)) {
      result.push(element)
    } else {
      for (const childNode of element.childNodes) {
        if (_Element(childNode)) {
          queue.push(childNode)
        }
      }
    }
  }

  return result
}
