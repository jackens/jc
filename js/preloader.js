/**
 * Animated gear preloader.
 */

import { $ } from './$.js'
import { svgUse } from './svg-use.js'

/**
 * @type {SVGSVGElement}
 */
export const preloader = $({
  ...svgUse('gear', {
    a: { stroke: '#456', fill: '#789' }
  }),
  k: {
    style: {
      animation: 'spin 4s linear infinite',
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      height: '30vmin',
      left: 'calc(50% - 15vmin)',
      padding: 0,
      position: 'fixed',
      top: 'calc(50% - 15vmin)',
      width: '30vmin',
      zIndex: 999
    }
  }
}).e
