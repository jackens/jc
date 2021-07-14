/**
 * Generic login page.
 */

import { $ } from './$.js'
import { app } from './app.js'
import { ASSIGN, BODY, EMPTY_STRING } from './common.js'
import { set } from './elvis.js'
import { jcStyle } from '../style.js/jc.style.js'
import { preloaderStyle } from '../style.js/preloader.style.js'
import { preloader } from './preloader.js'
import { disable, enable, getInputs } from './ui.js'
import { ws } from './ws.js'
import { _ } from './_.js'
import { _HTMLInputElement, _HTMLTextAreaElement } from './_typeof.js'

export const loginPage = async page => await new Promise(resolve => {
  $({ e: jcStyle, p: BODY })
  $({ e: preloaderStyle, p: BODY })

  const onclick = async e => {
    const inputs = getInputs(page)

    inputs.forEach(disable)
    $({ e: preloader, p: BODY })

    const config = {}
    inputs.forEach(input => {
      if (input.name !== '') {
        const path = input.name.split('.')
        const key = path.pop()
        set(config, ...path)[key] = input.value
      }
    })
    ASSIGN(config, app.dbConfigDefaults)

    const onReconnect = async send => {
      app.send = send
      await app.send({ action: 'connect', config })
    }

    try {
      if (!app.send) {
        app.send = await ws(app.wsUrls, onReconnect)
      }
      const connectedToDatabase = await app.send({ action: 'connect', config })
      if (connectedToDatabase) {
        return resolve()
      }
    } catch { }

    try {
      BODY.removeChild(preloader)
    } catch { }

    window.alert(_('Connection error'))
    inputs.forEach(enable)
  }

  const onkeyup = async e => {
    if (e.key === 'Enter') {
      await onclick()
    }
  }

  {
    const inputs = getInputs(page)

    for (const input of inputs) {
      if (_HTMLInputElement(input) || _HTMLTextAreaElement(input)) {
        input.onkeyup = onkeyup
      } else if (input.hasAttribute('send')) {
        input.onclick = onclick
      }
    }

    $({ e: page, p: BODY })

    for (const input of inputs) {
      if (input.value === EMPTY_STRING) {
        input.focus()
        break
      }
    }
  }
})
