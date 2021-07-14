/**
 * Simple login page DIV.
 */

import { $ } from './$.js'
import { jc } from './jc.js'
import { _ } from './_.js'

/**
 * @type {HTMLDivElement}
 */
export const simpleLoginPage = $({
  t: 'div',
  k: {
    style: {
      alignItems: 'center',
      backgroundColor: '#39d',
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      width: '100vw'
    }
  },
  i: [{
    t: 'div',
    k: {
      style: {
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 0 40px rgba(0,0,0,0.4)',
        boxSizing: 'border-box',
        maxHeight: '100vh',
        maxWidth: '300px',
        overflow: 'auto',
        padding: '17px'
      }
    },
    i: [jc({
      t: 'input',
      type: 'text',
      name: 'user',
      label: _('User')
    }), jc({
      t: 'input',
      type: 'password',
      name: 'password',
      label: _('Password')
    }), jc({
      t: 'button',
      send: true,
      icon: 'paperplane',
      text: _('Login', 'button')
    })]
  }]
}).e
