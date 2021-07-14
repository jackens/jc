/**
 * RPC (Remote Procedure Call) over WebSockets.
 */

import { obj } from './elvis.js'

const LOCALHOST = obj`localhost 127.0.0.1`
const RANDOMLY = () => Math.random() - 0.5

/**
 * @param {string[]} urls
 * @param {(send: (data: any) => Promise<void>) => Promise<void>} onReconnect
 * @param {number?} reconnectDelay
 * @returns {Promise<(data: any) => Promise<void>>}
 */
export const ws = async (urls, onReconnect, reconnectDelay = 1000) => {
  const handlers = {}
  let lastMessageId = 0
  for (const url of urls.sort(RANDOMLY)) {
    try {
      return await new Promise((resolve, reject) => {
        const u = new URL(url)
        u.protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        u.hostname = u.hostname in LOCALHOST ? window.location.hostname : u.hostname
        const socket = new window.WebSocket(u.href)

        socket.onopen = () => {
          if (onReconnect !== undefined) {
            socket.onclose = () => setTimeout(async () => {
              try {
                const send = await ws(urls, onReconnect, reconnectDelay)
                await onReconnect(send)
              } catch { }
            }, reconnectDelay)
          }
          resolve(async data => await new Promise(resolve => {
            const messageId = ++lastMessageId
            handlers[messageId] = resolve
            socket.send(JSON.stringify([messageId, data]))
          }))
        }
        socket.onerror = () => {
          socket.close()
          reject(new Error())
        }
        socket.onmessage = e => {
          try {
            const [messageId, data] = JSON.parse(e.data)
            if (messageId in handlers) {
              const handler = handlers[messageId]
              delete handlers[messageId]
              handler(data)
            }
          } catch { }
        }
      })
    } catch { }
  }
  throw new Error('ws')
}
