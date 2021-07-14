/**
 * Convenient converter from `JC_CONFIG` format to `$CONFIG` format.
 */

import { ASSIGN, ENTRIES, IS_ARRAY } from './common.js'
import { obj } from './elvis.js'
import { svgUse } from './svg-use.js'
import { _Object } from './_typeof.js'

const DIV = 'div'
const ICON = 'icon'
const INPUT = 'input'
const K = 'k'
const TEXT = 'text'

const C_K_KEYS = obj`onchange onclick oninput onkeyup style`
const C_T_KEYS = obj`c_t t`
const CHECKBOX_FILE_RADIO = obj`checkbox file radio`
const ICON_TEXT = obj`icon text`
const W_A_KEYS = obj`class label`
const W_C_L = obj`c l w`
const W_P_KEYS = obj`p w_p`

const arrayPushAll = (a, v) => IS_ARRAY(v) && (a.i = a.i ?? []) && a.i.push(...v)
const objectAssign = (o, v, p = 'a') => _Object(v) && (o[p] = o[p] ?? {}) && ASSIGN(o[p], v)

const icon = id => svgUse(id, {
  a: { fill: '#fff', stroke: '#fff', width: 17, height: 17 }
})

let nextId = 0

/**
 * @param {import('./common.js').JC_CONFIG} config
 * @returns {import('./common.js').$CONFIG}
 */
export const jc = config => {
  const c = { t: INPUT }
  const w = { t: DIV, a: { class: 'jc' }, i: [c] }
  const l = { t: 'label' }
  const wcl = { w, c, l }

  ENTRIES(config).forEach(([key, value]) => {
    const keyValue = { [key]: value }
    const m = key.match(/^[wcl]_[ak]_(.+)$/)
    if (m !== null) {
      objectAssign(wcl[key[0]], {
        [m[1]]: value
      }, key[2])
    } else if (key.match(/^[wcl]_[ak]$/) !== null) {
      objectAssign(wcl[key[0]], value, key[2])
    } else if (key.match(/^[cl]_i$/) !== null) {
      arrayPushAll(wcl[key[0]], value)
    } else if (key in W_C_L) {
      objectAssign(wcl[key], value?.a)
      objectAssign(wcl[key], value?.k, K)
      arrayPushAll(wcl[key], value?.i)
    } else if (key in W_A_KEYS) {
      objectAssign(w, keyValue)
    } else if (key in W_P_KEYS) {
      w.p = value
    } else if (key === 'type') {
      objectAssign(c, keyValue)
    } else if (key in C_K_KEYS) {
      objectAssign(c, keyValue, K)
    } else if (key in C_T_KEYS) {
      c.t = value
    } else if (!(key in ICON_TEXT)) {
      objectAssign(c, keyValue)
    }
  })

  if (c.t === INPUT) {
    if (c?.a?.type in CHECKBOX_FILE_RADIO) {
      const id = `jc-${++nextId}`
      objectAssign(c, { id })
      objectAssign(l, { for: id })
      arrayPushAll(w, [{ t: DIV, i: [l] }])
      if (TEXT in config && ICON in config) {
        arrayPushAll(l, [icon(config[ICON]), {
          t: DIV
        }, {
          e: config[TEXT]
        }])
      } else if (ICON in config) {
        arrayPushAll(l, [icon(config[ICON])])
      } else if (TEXT in config) {
        arrayPushAll(l, [{ e: config[TEXT] }])
      }
    } else {
      if (TEXT in config) {
        objectAssign(c, { value: config[TEXT] })
      }
    }
  } else {
    if (TEXT in config && ICON in config) {
      arrayPushAll(c, [icon(config[ICON]), { t: DIV }, { e: config[TEXT] }])
    } else if (ICON in config) {
      arrayPushAll(c, [icon(config[ICON])])
    } else if (TEXT in config) {
      arrayPushAll(c, [{ e: config[TEXT] }])
    }
  }

  return w
}
