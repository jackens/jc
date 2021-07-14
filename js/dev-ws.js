/**
 * Proof of Concept of the WebSocket server that supports specified handlers.
 */

import ws from 'ws'

const { Server } = ws

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)

/**
 * @param {import('./common.js').MAP<(params: { clients: WebSocket[], socket: WebSocket, data: object }) => Promise<void>>} handlers
 */
export default handlers => {
  const wsServer = new Server({ port: process.argv[2] })
  const clients = wsServer.clients

  wsServer.on('connection', async socket => {
    socket.state = {}
    try {
      socket.on('message', async rawData => {
        if (typeof rawData === 'string') {
          try {
            const [messageId, data] = JSON.parse(rawData)
            try {
              socket.send(JSON.stringify([messageId, data.action in handlers
                ? await handlers[data.action]({ clients, socket, data })
                : false
              ]))
            } catch {
              socket.send(JSON.stringify([messageId, false]))
            }
          } catch { }
        }
      })
    } catch {
      socket.terminate()
    }
  })
}
