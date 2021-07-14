/**
 * Unit tests.
 */

import $Test from '../test.js/$.test.js'
import deepEqualTest from '../test.js/deep-equal.test.js'
import dsTest from '../test.js/ds.test.js'
import elvisTest from '../test.js/elvis.test.js'
import escapeTest from '../test.js/escape.test.js'
import fixTypographyTest from '../test.js/fix-typography.test.js'
import isdTest from '../test.js/isd.test.js'
import jcTest from '../test.js/jc.test.js'
import jsOnParseTest from '../test.js/js-on-parse.test.js'
import js2cssTest from '../test.js/js2css.test.js'
import plUralTest from '../test.js/pl-ural.test.js'
import svgUseTest from '../test.js/svg-use.test.js'
import uuidv1Test from '../test.js/uuidv1.test.js'
import _Test from '../test.js/_.test.js'
import _inTest from '../test.js/_in.test.js'
import _typeofTest from '../test.js/_typeof.test.js'
import { deepEqual } from './deep-equal.js'

const stats = { total: 0, passed: 0, failed: 0 }

const ade = (actual, expected) => {
  const result = deepEqual(actual, expected)
  const src = new Error().stack.replace(/\n/g, ' ')
    .replace(/^.*default\s*\((.+?)\).*$/, '$1') // Chromium
    .replace(/^.*default@(.+?)\s.*$/, '$1') // Firefox
  ++stats.total
  ++stats[result ? 'passed' : 'failed']
  console.log(`${stats.total.toString().padEnd(5)}${src}${result ? '' : '\tFAILED'}`)
  console.assert(result)
  if (!result) {
    console.log(actual)
    console.log(expected)
  }
}

window.onload = async () => {
  document.body.innerText = 'Open the developer tools console to see the unit test results…'
  for (const test of [
    _inTest,
    _Test,
    _typeofTest,
    $Test,
    deepEqualTest,
    dsTest,
    elvisTest,
    escapeTest,
    fixTypographyTest,
    isdTest,
    jcTest,
    js2cssTest,
    jsOnParseTest,
    plUralTest,
    svgUseTest,
    uuidv1Test
  ]) {
    try {
      await test(ade)
    } catch (e) {
      console.error(e)
    }
  }
  console.log(stats)
}
