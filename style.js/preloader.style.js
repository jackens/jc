/**
 * Styles for animated gear preloader.
 */

import { style } from '../js/style.js'

export const preloaderStyle = style({
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
})
