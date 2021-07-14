/**
 * Styles for simple chess application showing attack/defense counters.
 */

import { style } from '../js/style.js'

export const chessStyle = style({
  body: {
    backgroundColor: '#000',
    margin: 0,
    '>div': {
      height: '12.5vmin',
      position: 'absolute',
      width: '12.5vmin',
      '>*': {
        position: 'absolute'
      },
      '>div': {
        fontFamily: 'Arial,Helvetica,sans-serif',
        fontSize: '7vmin',
        fontWeight: 'bold',
        padding: '0 4px 0 4px',
        right: 0,
        textShadow: '0 0 4px #000',
        userSelect: 'none'
      },
      '>svg': {
        height: '100%', width: '100%'
      }
    }
  }
})
