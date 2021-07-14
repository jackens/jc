/**
 * Helper that converts JavaScript objects in `JS2CSS` format to CSS definitions.
 * An iterative implementation that does not cause a stack overflow error.
 *
 * The `JS2CSS` format provides a hierarchical description of CSS rules.
 *
 * - Keys of subobjects whose values are NOT objects are treated as CSS attribute, and values are treated as values of those CSS attributes; the concatenation of keys of all parent objects is a CSS rule.
 * - All keys ignore the part starting with a $ sign until the end of the key (e.g. `src$1` → `src`, `@font-face$1` → `@font-face`).
 * - In keys specifying CSS attribute, all uppercase letters are replaced by lowercase letters with an additional - character preceding them (e.g. `fontFamily` → `font-family`).
 * - Commas in keys that makes a CSS rule cause it to “split” and create separate rules for each part (e.g. `{div:{'.a,.b,.c':margin:0}}` → `div.a{margin:0}div.b{margin:0}div.c{margin:0}`).
 * - Top-level keys that begin with `@` are not concatenated with subobject keys.
 */

import { EMPTY_STRING, IS_ARRAY } from './common.js'
import { _Number, _String } from './_typeof.js'

const L_BRACE = '{'
const R_BRACE = '}'

const split$0 = s => s.split('$')[0]

const obj2css = (obj, prefix, result) => {
  const queue = [[obj, prefix]]
  while (queue.length) {
    const [obj, prefix] = queue.shift()
    if (IS_ARRAY(obj)) {
      result.push(
        prefix,
        prefix !== EMPTY_STRING ? L_BRACE : EMPTY_STRING,
        obj.join(';'),
        prefix !== EMPTY_STRING ? R_BRACE : EMPTY_STRING
      )
    } else {
      const todo = []
      let arrPushed = false
      let arr = []
      for (const key in obj) {
        const value = obj[key]
        if (_String(value) || _Number(value)) {
          if (!arrPushed) {
            arrPushed = true
            arr = []
            todo.push([arr, prefix])
          }
          arr.push(`${split$0(key).replace(/([A-Z])/g, (_, letter) =>
            '-' + letter.toLowerCase())}:${value}`)
        } else {
          arrPushed = false
          for (const rule of split$0(key).split(',')) {
            todo.push([value, prefix + rule])
          }
        }
      }
      queue.unshift(...todo)
    }
  }
}

/**
 * @param {import('./common.js').JS2CSS} style
 * @returns {string}
 */
export const js2css = style => {
  const result = []
  for (const key in style) {
    if (key[0] === '@') {
      result.push(split$0(key) + L_BRACE)
      obj2css(style[key], EMPTY_STRING, result)
      result.push(R_BRACE)
    } else {
      obj2css(style[key], split$0(key), result)
    }
  }
  return result.join(EMPTY_STRING)
}
