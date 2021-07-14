/**
 * Style for “Pink Painter” puzzle game.
 */

import { style } from '../js/style.js'

export const pinkPainterStyle = style({
  'html,body': {
    backgroundColor: '#000',
    display: 'fixed',
    height: '100vh',
    margin: 0,
    overflow: 'hidden',
    textAlign: 'center',
    width: '100vw'
  },
  '*': {
    boxSizing: 'border-box',
    userSelect: 'none'
  },
  '.button,.level,.board': {
    position: 'absolute'
  },
  '.button': {
    cursor: 'pointer'
  },
  '.board.cell>svg': {
    height: '80%',
    left: '10%',
    position: 'absolute',
    top: '10%',
    width: '80%'
  },
  '.cell': {
    backgroundSize: '100% 100%',
    borderStyle: 'solid',
    display: 'inline-block',
    height: '12.5%',
    position: 'absolute',
    width: '12.5%'
  },
  '[c="0"]': {
    backgroundColor: '#6b4'
  },
  '[c="1"]': {
    backgroundColor: '#ff0'
  },
  '[c="2"]': {
    backgroundColor: '#14b'
  },
  '[c="3"]': {
    backgroundColor: '#e32'
  }
})
