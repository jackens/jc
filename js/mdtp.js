/**
 * Blogging platform based on Markdown and $\KaTeX$.
 */

import katexCss from '../_libs-out/katex-css.min.js'
import markdownItKatex from '../_libs-out/markdown-it-katex.min.js'
import markdownItLinkAttributes from '../_libs-out/markdown-it-link-attributes.min.js'
import markdownIt from '../_libs-out/markdown-it.min.js'
import { mdtpStyle } from '../style.js/mdtp.style.js'
import { $ } from './$.js'
import { BODY } from './common.js'
import { fixTypography } from './fix-typography.js'
import { nanolight } from './nanolight.js'

window.onload = async () => {
  const md = (markdownIt({
    html: true,
    linkify: true,
    highlight: code => $({ ...nanolight(code) }).e.outerHTML
  })).use(markdownItLinkAttributes, {
    attrs: { target: '_blank' }
  }).use(markdownItKatex)

  const path = window.decodeURI(window.location.search.slice(1)) || '/md/index.md'
  const mdContent = await (await window.fetch(path)).text()

  mdContent.replace(/# (.+?)\n/, (_, title) => (document.title = title))

  $({
    e: BODY,
    i: [{
      t: 'style', i: [{ e: katexCss }]
    }, {
      e: mdtpStyle
    }].concat(Array.from($({
      t: 'div', k: { innerHTML: md.render(mdContent) }
    }).e.childNodes).map(e => ({ e })))
  })

  fixTypography(BODY)
}
