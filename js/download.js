/**
 * Helper for handling client-side (web browser) generated downloads.
 */

import { $ } from './$.js'
import { BODY } from './common.js'

/**
 * @param {BlobPart[]} a
 * @param {string} download
 * @param {string} type
 */
export const download = (a, download, type) => {
  try {
    const href = URL.createObjectURL(new window.Blob(a, { type }))
    const e = $({
      t: 'a', p: BODY, a: { href, download }
    }).e
    e.click()
    setTimeout(() => {
      BODY.removeChild(e)
      URL.revokeObjectURL(href)
    }, 0)
  } catch { }
}
