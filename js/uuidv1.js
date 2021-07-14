/**
 * UUID v1 identifier (containing creation timestamp) generator.
 */

import { EMPTY_STRING } from './common.js'

const ZEROS = '0'.repeat(16)

let globalCounter = 0

/**
 * @returns {string}
 */
export const uuidv1 = () => {
  const now = ZEROS + (1e4 * (+new Date() + 122192928e5)).toString(16)

  globalCounter = (globalCounter + 1) & 4095

  return [
    now.slice(-8),
    '-',
    now.slice(-12, -8),
    -1,
    now.slice(-15, -12),
    -8,
    ('000' + globalCounter.toString(16)).slice(-3),
    '-',
    (Math.random().toString(16) + ZEROS).slice(2, 14)
  ].join(EMPTY_STRING)
}
