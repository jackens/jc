/**
 * Helper implementing typographic corrections appropriate for Polish typography.
 * An iterative implementation that does not cause a stack overflow error.
 */

import { $ } from './$.js'
import { EMPTY_STRING } from './common.js'
import { obj } from './elvis.js'
import { _Element, _Text } from './_typeof.js'

const TAGS_TO_SKIP = obj`IFRAME NOSCRIPT PRE SCRIPT STYLE TEXTAREA`

/**
 * @param {HTMLElement} htmlElement
 */
export const fixTypography = htmlElement => {
  const queue = [htmlElement]
  while (queue.length) {
    const elementOrText = queue.shift()
    if (_Element(elementOrText)) {
      for (const childNode of elementOrText.childNodes) {
        if (_Text(childNode)) {
          queue.push(childNode)
        } else if (_Element(childNode) && !(childNode.tagName.toUpperCase() in TAGS_TO_SKIP)) {
          queue.push(childNode)
        }
      }
    } else if (_Text(elementOrText) && elementOrText.nodeValue !== null && elementOrText.nodeValue.trim() !== EMPTY_STRING) {
      let previousElement = elementOrText
      elementOrText.nodeValue.split(/(\s|\(|„)([aiouwz—]\s)/gi).forEach((e, i) => {
        i %= 3
        const node = i === 2
          ? $({ t: 'span', a: { class: 'nbsp' }, i: [{ e }] }).e
          : i === 1
            ? $({ e }).e
            : $({ e: e.replace(/([/.])(?=[^\s])/g, '$1\u200B') }).e
        if (elementOrText.parentNode !== null) {
          elementOrText.parentNode.insertBefore(node, previousElement.nextSibling)
        }
        previousElement = node
      })
      elementOrText.parentNode?.removeChild(elementOrText)
    }
  }
}
