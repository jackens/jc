#!/usr/bin/env node

import { execSync } from 'child_process'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'

const APP_IN = './app-dev'
const APP_OUT = '../jackens.github.io/app'
const SKIP_APP = { 'db-man': 1, 'icons-demo': 1, test: 1, todo: 1 }
const TITLE = '<title>'
const DEFAULT_CONTENT_SECURITY_POLICY = "default-src 'none';script-src 'unsafe-inline';style-src 'unsafe-inline'"
const CONTENT_SECURITY_POLICY = {
  'jc-demo': `${DEFAULT_CONTENT_SECURITY_POLICY};img-src data:`,
  mdtp: `${DEFAULT_CONTENT_SECURITY_POLICY};img-src 'self';font-src 'self';connect-src https:`,
  'nogi-stonogi': `${DEFAULT_CONTENT_SECURITY_POLICY};img-src 'self' data:`,
  'pink-painter': `${DEFAULT_CONTENT_SECURITY_POLICY};img-src 'self'`
}

for (const dirEnt of readdirSync(APP_IN, { withFileTypes: true })) {
  const name = dirEnt.name

  if (!dirEnt.isDirectory() || SKIP_APP[name]) {
    continue
  }

  try {
    mkdirSync(`${APP_OUT}/${name}`, { recursive: true })
  } catch { }

  try {
    writeFileSync(`${APP_OUT}/${name}/index.html`,
      readFileSync(`${APP_IN}/${name}/index.html`, 'utf-8').toString().replace(/\r/g, '')
        .replace(TITLE, `<meta http-equiv="Content-Security-Policy" content="${CONTENT_SECURITY_POLICY[name] ?? DEFAULT_CONTENT_SECURITY_POLICY}" />\n${TITLE}`)
        .replace(/(<script\s+type=".+?")\s*src="(.+?)">\s*(<\/script>)/g, (_, prefix, src, suffix) =>
          `${prefix}>${execSync(`esbuild --charset=utf8 --bundle --minify --format=esm '.${src}'`, { maxBuffer: 1e7 }).slice(0, -1)}${suffix}`))
  } catch (e) {
    console.log(name)
    console.error(e)
  }
}
