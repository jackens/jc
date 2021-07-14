#!/usr/bin/env node

import { execSync } from 'child_process'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'

const APP_DIR = '../jackens.github.io/app'
const BASE_URL = 'https://jackens.github.io'
const content = [
  '# Jackens’ Collection',
  '## TOC',
  '### Code @ `./js`', '«js»',
  '### Code @ `./style.js`', '«style.js»',
  '### Demos', '«DEMO»'
]
const descs = {}

const setContent = (marker, lines) => {
  content[content.indexOf(`«${marker}»`)] = lines.sort().join('\n')
}

if (process.argv.length < 3) {
  execSync('rm -rf ./_d.ts')
  execSync('tsc ./js/*.js --declaration --allowJs --emitDeclarationOnly --removeComments --outDir ./_d.ts')
}

for (const dir of ['js', 'style.js']) {
  const lines = []

  readdirSync(dir, { withFileTypes: true })
    .filter(dirEnt => dirEnt.isFile() && dirEnt.name.endsWith(`.${dir}`))
    .sort()
    .forEach(dirEnt => {
      const name = dirEnt.name.split('.')[0]
      const codeJsPath = `${dir}/${dirEnt.name}`
      const codeTestJsPath = `test.js/${name}.test.js`
      const demoPath = `${APP_DIR}/${name}`
      const codeJs = readFileSync(codeJsPath, 'utf8').toString().replace(/\r/g, '')
      const links = [`[Source Code](${codeJsPath})`]
      const importsSpec = codeJs.split('\n').filter(line => line.match(/^import /)).join('\n')
      const exportsSpec = readFileSync(`_d.ts/${codeJsPath.replace(/\.js$/, '.d.ts')}`, 'utf8')
        .toString()
        .replace(/\r/g, '')
        .replace(/\ndeclare .+;/g, '')
        .replace(/import\(['"](.*?)\/common\.js['"]\)\./g, '')
        .replace(/export \{\};\n/g, '')
        .replace(/\n$/, '')

      if (existsSync(codeTestJsPath)) {
        links.push(`[Unit Tests](${codeTestJsPath})`)
      }

      if (existsSync(demoPath)) {
        links.push(`[Demo](${BASE_URL}/app/${name}/)`)
      }

      content.push(`## \`${codeJsPath}\``, links.join(' • '))

      codeJs.replace(/^\/\*\*([\s\S]+?)\*\//, (_, jsdoc) => {
        const desc = jsdoc.split('\n')
          .map(line => line.replace(/^\s+\*($|\s)/, ''))
          .join('\n').trim()

        descs[dirEnt.name] = desc.split('\n')[0]
        content.push('### Description', desc)
        lines.push(`- [\`${dirEnt.name}\`](#${codeJsPath.replace(/[^\w_-]/g, '')}): ${descs[dirEnt.name]}`)
      })

      if (importsSpec !== '') {
        content.push('### Imports', `\`\`\`js\n${importsSpec}\n\`\`\``)
      }

      if (exportsSpec !== '') {
        content.push('### Exports', `\`\`\`ts\n${exportsSpec}\n\`\`\``)
      }
    })

  setContent(dir, lines)
}

setContent('DEMO', readdirSync(APP_DIR, { withFileTypes: true })
  .filter(dirEnt => dirEnt.isDirectory())
  .map(dirEnt => {
    const title = readFileSync(`app-dev/${dirEnt.name}/index.html`, 'utf8').toString().match(/<title>(.+?)<\/title>/)[1]
    return `- [${title}](${BASE_URL}/app/${dirEnt.name}/): ${descs[dirEnt.name + '.js']}`
  }))

content.push('## License', readFileSync('LICENSE', 'utf8').toString().replace(/\r/g, ''))

writeFileSync('readme.md', content.join('\n\n'))
