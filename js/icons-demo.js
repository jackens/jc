/**
 * `svgUse` and `svg` helpers demo.
 */

import { preloaderStyle } from '../style.js/preloader.style.js'
import gear from '../_icons-out/framework7io-framework7-icons/gear.js'
import { $ } from './$.js'
import { BODY, KEYS, VALUES } from './common.js'
import { preloader } from './preloader.js'
import { svgUse } from './svg-use.js'
import { svg } from './svg.js'

window.onload = async () => {
  const name = window.location.search.slice(1)

  if (name === '') {
    const names = [];

    (await (await window.fetch('/_icons-out/')).text())
      .replace(/href="\/_icons-out\/(.+?)\/"/g, (_, name) => names.push(name))

    $({
      e: BODY,
      i: [{
        t: 'ul',
        i: names.map(name => ({
          t: 'li',
          i: [{
            t: 'a', a: { href: `?${name}` }, i: [{ e: name }]
          }]
        }))
      }]
    })
  } else {
    $({
      e: BODY, i: [svg(gear), preloaderStyle, preloader].map(e => ({ e }))
    })

    const icons = (await import(`../_icons-out/${name}.js`)).default

    BODY.removeChild(preloader)

    $({
      e: BODY,
      i: [{ e: svg(VALUES(icons)) }].concat(KEYS(icons).map((name, id) => svgUse((id = name.replace(/\.js$/, '')), {
        a: { width: 42, height: 42 },
        k: {
          style: { margin: '2px' }, onclick: () => window.alert(id)
        }
      })))
    })
  }
}
