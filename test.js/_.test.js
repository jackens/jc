import { app } from '../js/app.js'
import { _ } from '../js/_.js'

export default ade => {
  app.locales = {
    pl: {
      Password: 'Hasło',
      button: { Login: 'Zaloguj' }
    }
  }
  app.lang = 'pl'

  ade(_('Login'), 'Login')
  ade(_('Login', 'button'), 'Zaloguj')

  ade(_('Password'), 'Hasło')
  ade(_('Password', 'undefined_version'), 'Hasło')

  ade(_('Undefined text'), 'Undefined text')
  ade(_('Undefined text', 'undefined_version'), 'Undefined text')

  ade(_('toString'), 'toString')
  ade(_('toString', 'undefined_version'), 'toString')
}
