/**
 * Web application globals object.
 */

import { _in } from './_in.js'

export const app = {
  updateLang: () => {
    try {
      const lang = window.localStorage.getItem('lang')
      if (_in(lang, app.locales)) {
        app.lang = lang
        return
      }
    } catch { }
    try {
      for (const lang of navigator.languages) {
        if (_in(lang, app.locales)) {
          app.lang = lang
          return
        }
      }
    } catch { }
  }
}
