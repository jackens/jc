/**
 * Proof of Concept of a WebSocket server exposing a file system.
 */

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import devWs from './dev-ws.js'

const STAT_METHODS = ['isBlockDevice', 'isCharacterDevice', 'isDirectory', 'isFIFO', 'isFile', 'isSocket', 'isSymbolicLink']
const INVALID_DIR_NAME = { '': 1, '.': 1, '..': 1 }

const validDirName = name => INVALID_DIR_NAME[name] !== 1
const sanitizePath = path => `${process.cwd()}/${path.split('/').filter(validDirName).join('/')}`

const list = ({ data: { path } }) => {
  const result = readdirSync(sanitizePath(path), { withFileTypes: true })
  for (const dirent of result) {
    STAT_METHODS.forEach(method => (dirent[method] = dirent[method]()))
  }
  return result
}

const read = ({ data: { path } }) => readFileSync(sanitizePath(path), 'utf8').toString()

const write = ({ data: { path, content } }) => {
  path = sanitizePath(path)
  try {
    mkdirSync(path.split('/').slice(0, -1).join('/'), { recursive: true })
  } catch { }
  writeFileSync(path, content)
  return true
}

devWs({ list, read, write })
