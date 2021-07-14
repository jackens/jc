/**
 * Proof of Concept of a WebSocket server providing a connection to a MariaDB database.
 */

import { createConnection } from 'mariadb'
import devWs from './dev-ws.js'

const connect = async ({ socket, data: { config } }) => {
  try {
    socket.state.connection.destroy()
  } catch { }
  socket.state.connection = await createConnection({ ...config, rowsAsArray: true }) // socketTimeout: «ms»
  socket.state.connection.on('error', () => socket.close())
  socket.on('close', () => socket.state.connection.destroy())
  return true
}

const query = async ({ socket, data: { query } }) => await socket.state.connection.query(query)

devWs({ connect, query })
