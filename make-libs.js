#!/usr/bin/env node

import { execSync } from 'child_process'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'

const LIBS_IN = './libs-in'
const LIBS_OUT = './_libs-out'

const katexCss = readFileSync('./node_modules/katex/dist/katex.min.css', 'utf8')
  .toString().replace(/\r/g, '').replace(/url\(fonts\//g, 'url(/fonts/')

try {
  mkdirSync(LIBS_OUT)
} catch { }

writeFileSync(`${LIBS_OUT}/katex-css.min.js`, `export default ${JSON.stringify(katexCss)}`)

for (const dirent of readdirSync(LIBS_IN, { withFileTypes: true })) {
  if (!dirent.isFile()) {
    continue
  }

  const basename = dirent.name

  execSync(`esbuild --charset=utf8 --bundle --minify --format=esm --outfile='${LIBS_OUT}/${basename.replace(/\.js$/, '.min.js')}' '${LIBS_IN}/${basename}'`)
}
