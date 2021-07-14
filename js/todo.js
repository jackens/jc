/**
 * Simple self-hosted Trello/Wekan alternative app.
 */

import gear from '../_icons-out/framework7io-framework7-icons/gear.js'
import paperPlane from '../_icons-out/framework7io-framework7-icons/paperplane.js'
import plus from '../_icons-out/framework7io-framework7-icons/plus.js'
import trashCircle from '../_icons-out/framework7io-framework7-icons/trash_circle.js'
import { $ } from './$.js'
import { app } from './app.js'
import { BODY } from './common.js'
import { loginPage } from './login-page.js'
import { simpleLoginPage } from './simple-login-page.js'
import { svg } from './svg.js'
import { todoBoard } from './todo-board.js'

window.onload = async () => {
  app.wsUrls = ['wss://localhost:13306', 'wss://localhost:23306', 'wss://localhost:33306']

  app.dbConfigDefaults = { host: 'localhost', port: 3306 }

  app.locales = {
    pl: {
      'Add new list': 'Dodaj nową listę',
      'Add new task': 'Dodaj nowe zadanie',
      'Connection error': 'Błąd połączenia',
      'Do You really want to delete the list with all tasks?!?': 'Czy na pewno chcesz usunąć listę wraz ze wszystkimi zadaniami?!?',
      button: { Login: 'Zaloguj' },
      Password: 'Hasło',
      User: 'Użytkownik'
    }
  }

  app.updateLang()

  BODY.onfocus = e => {
    // TODO
  }
  BODY.onblur = e => {
    // TODO
  }

  app.svgElement = svg(gear, paperPlane, plus, trashCircle)

  $({ e: app.svgElement, p: BODY })

  await loginPage(simpleLoginPage)

  window.onbeforeunload = () => true

  $({
    e: BODY, k: { innerText: '' }
  })

  await todoBoard()
}
