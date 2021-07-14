/**
 * Lightweight helper for creating and modifying DOM elements.
 */

import { ASSIGN, DOCUMENT, EMPTY_STRING, ENTRIES, NAMESPACE_SVG } from './common.js'
import { _Boolean, _Element, _Number, _Object, _String } from './_typeof.js'

const NAMESPACE = {
  svg: NAMESPACE_SVG,
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink'
}

/**
 * @param {import('./common.js').$CONFIG} config
 * @returns {import('./common.js').$E<Element | HTMLElement | Text>}
 */
export const $ = ({ a, e, i, k, n, p, t }) => {
  if (e === undefined) {
    if (t !== undefined) {
      n = n ?? NAMESPACE[t]
      e = n !== undefined
        ? DOCUMENT.createElementNS(n, t) // Element
        : DOCUMENT.createElement(t) // HTMLElement
    }
  } else if (_String(e) || _Number(e)) {
    e = DOCUMENT.createTextNode(e) // Text
  }
  if (_Element(e)) {
    if (_Object(a)) {
      ENTRIES(a).forEach(([key, aAtKey]) => {
        const m = key.match(/^(.+?):(.*)$/)
        if (_Boolean(aAtKey)) {
          if (aAtKey) {
            if (m !== null) {
              e.setAttributeNS(NAMESPACE[m[1]], m[2], EMPTY_STRING)
            } else {
              e.setAttribute(key, EMPTY_STRING)
            }
          } else {
            if (m !== null) {
              e.removeAttributeNS(NAMESPACE[m[1]], m[2])
            } else {
              e.removeAttribute(key)
            }
          }
        } else {
          if (m !== null) {
            e.setAttributeNS(NAMESPACE[m[1]], m[2], aAtKey)
          } else {
            e.setAttribute(key, aAtKey)
          }
        }
      })
    }
    if (_Object(k)) {
      ENTRIES(k).forEach(([key, kAtKey]) => {
        if (_Object(kAtKey)) {
          try {
            ASSIGN(e[key], kAtKey)
          } catch {
            e[key] = kAtKey
          }
        } else {
          e[key] = kAtKey
        }
      })
    }
    if (i !== undefined) {
      i.forEach(item => $({ n, ...item, p: e }))
    }
  }
  if (p !== undefined && e !== undefined) {
    p.appendChild(e)
  }
  return { e }
}
