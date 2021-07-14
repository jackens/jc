#!/usr/bin/env node

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import jsdom from 'jsdom'

const ICONS_IN = './_icons-in'
const ICONS_OUT = './_icons-out'

const PRESERVE_DIR = { optimized: 1, outline: 1, solid: 1 }
const SYMBOL_A_KEYS_TO_DELETE = [
  'aria-labelledby',
  'baseProfile',
  'class',
  'height',
  'role',
  'title',
  'version',
  'width',
  'x',
  'xml:space',
  'xmlns:xlink',
  'xmlns',
  'y'
]
const queue = [ICONS_IN]
const found = {}
const { document } = (new jsdom.JSDOM()).window
const div = document.createElement('div')

const element2config = (element, config = {}) => {
  try {
    config.t = element.tagName.toLowerCase()
    const a = {}
    for (const attribute of element.attributes) {
      a[attribute.name] = attribute.value
    }
    if (Object.keys(a).length) {
      config.a = a
    }
    const i = []
    for (const childNode of element.childNodes) {
      const item = element2config(childNode)
      if (item !== undefined && Object.keys(item).length) {
        i.push(item)
      }
    }
    if (i.length) {
      config.i = i
    }
  } catch { }
  return config
}

try {
  mkdirSync(ICONS_OUT)
} catch { }

while (queue.length) {
  const pathToDo = queue.shift()
  const pathsToDo = []

  for (const dirEnt of readdirSync(pathToDo, { withFileTypes: true })) {
    const path = `${pathToDo}/${dirEnt.name}`
    if (dirEnt.isDirectory()) {
      queue.push(path)
    } else if (dirEnt.isFile() && dirEnt.name.endsWith('.svg')) {
      pathsToDo.push(path)
    }
  }

  if (!pathsToDo.length) {
    continue
  }

  for (const pathToDo of pathsToDo) {
    try {
      const dirs = pathToDo.split('/')
      const id = dirs.pop().replace(/\.svg$/, '').trim()
      const name = dirs
        .map(dir => dir.toLowerCase().replace(/\./g, '-'))
        .filter((dir, i) => i === 2 || i === 3 || PRESERVE_DIR[dir])
        .join('-')

      if (found[name] === undefined) {
        found[name] = {}
        try {
          mkdirSync(`${ICONS_OUT}/${name}`)
        } catch { }
      }

      if (found[name][id] !== undefined) {
        continue
      }

      div.innerHTML = readFileSync(pathToDo, 'utf8').toString()
      const svg = element2config(div.querySelector('svg'))
      const symbol = { a: svg.a, i: svg.i }

      if (symbol.a === undefined || symbol.i === undefined) {
        throw new Error('Missing attributes and/or items')
      }

      if (svg.a.viewBox !== undefined) {
        symbol.a.viewBox = svg.a.viewBox.replace(/px/g, '')
      } else if (svg.a.width !== undefined && svg.a.height !== undefined) {
        symbol.a.viewBox = `0 0 ${svg.a.width} ${svg.a.height}`
      }

      if (symbol.a.viewBox === undefined) {
        throw new Error('Missing ‘viewBox’ attribute')
      }

      symbol.a.id = id

      SYMBOL_A_KEYS_TO_DELETE.forEach(key => {
        delete symbol.a[key]
      })

      writeFileSync(`${ICONS_OUT}/${name}/${id}.js`,
        `export default ${JSON.stringify(symbol, null, 2)}\n`)

      console.log(name, id)

      found[name][id] = 0
    } catch (e) {
      console.error(pathToDo)
    }
  }
}

Object.entries(found).forEach(([name, ids]) => {
  const imports = []
  const exports = []
  Object.keys(ids).sort().forEach((id, i) => {
    imports.push(`import i${i} from './${name}/${id}.js'`)
    exports.push(`  '${id}': i${i}`)
  })
  writeFileSync(`${ICONS_OUT}/${name}.js`,
    `${imports.join('\n')}\nexport default {\n${exports.join(',\n')}\n}\n`)
})
