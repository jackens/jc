/**
 * SQL Data Source CRUD abstraction methods.
 */

import { app } from './app.js'
import { CREATE, KEYS } from './common.js'
import { a2o, oop } from './elvis.js'
import { escape } from './escape.js'

const ID = 'id'

const schemaDotTable = (schema, table) => `${escape.name(schema)}.${escape.name(table)}`

const dsMethods = {
  /**
   * @param {string} _schema
   * @param {string} _table
   * @param {string[]} _columns
   * @param {(name: string) => boolean} _isValidColumnName
   * @param {import('./common.js').MAP<any>} data
   * @returns {Promise<boolean>}
   */
  insert: async (_schema, _table, _columns, _isValidColumnName, data) => {
    const keys = KEYS(data).filter(_isValidColumnName)
    const { affectedRows, insertId } = await app.send({
      action: 'query',
      query: `INSERT INTO ${schemaDotTable(_schema, _table)}(${keys.map(escape.name).join()})VALUES(${keys.map(key => escape.value(data[key])).join()})`
    })
    data[ID] = insertId
    return affectedRows === 1
  },

  /**
   * @param {string} _schema
   * @param {string} _table
   * @param {string[]} _columns
   * @param {(name: string) => boolean} _isValidColumnName
   * @param {import('./common.js').MAP<any>} where
   * @returns {Promise<import('./common.js').MAP<import('./common.js').MAP<any>>>}
   */
  select: async (_schema, _table, _columns, _isValidColumnName, where) => {
    const rows = await app.send({
      action: 'query',
      query: `SELECT ${_columns.map(escape.name).join()} FROM ${schemaDotTable(_schema, _table)} WHERE ${KEYS(where).filter(_isValidColumnName).map(key => escape.name(key) + '=' + escape.value(where[key])).join(' AND ')}`
    })
    // eslint-disable-next-line no-return-assign,no-sequences
    return rows.reduce((result, row) => (result[row[0]] = _columns.reduce(a2o(row), CREATE(null)), result), CREATE(null))
  },

  /**
   * @param {string} _schema
   * @param {string} _table
   * @param {string[]} _columns
   * @param {(name: string) => boolean} _isValidColumnName
   * @param {import('./common.js').MAP<any>} data
   * @param {string} name
   * @param {any} newValue
   * @returns {Promise<boolean>}
   */
  update: async (_schema, _table, _columns, _isValidColumnName, data, name, newValue) => {
    if (!_isValidColumnName(name)) {
      return false
    }
    data[name] = newValue
    const NAME = escape.name(name)
    const { affectedRows } = await app.send({
      action: 'query',
      query: `UPDATE ${schemaDotTable(_schema, _table)} SET ${NAME}=${escape.value(newValue)} WHERE ${escape.name(ID)}=${escape.value(data[ID])}`
    })
    return affectedRows === 1
  },

  /**
   * @param {string} _schema
   * @param {string} _table
   * @param {string[]} _columns
   * @param {(name: string) => boolean} _isValidColumnName
   * @param {import('./common.js').MAP<any>} data
   * @returns {Promise<boolean>}
   */
  delete: async (_schema, _table, _columns, _isValidColumnName, data) => {
    const { affectedRows } = await app.send({
      action: 'query',
      query: `DELETE FROM ${schemaDotTable(_schema, _table)} WHERE ${escape.name(ID)}=${escape.value(data[ID])}`
    })
    return affectedRows === 1
  }
}

/**
 * @param {string} schema
 * @param {string} table
 * @param {string[]} columns
 * @returns {{
 *  insert: (data:  import('./common.js').MAP<any>) => Promise<boolean>
 *  select: (where: import('./common.js').MAP<any>) => Promise<import('./common.js').MAP<import('./common.js').MAP<any>>>
 *  update: (data:  import('./common.js').MAP<any>, name: string, value: any) => Promise<boolean>
 *  delete: (data:  import('./common.js').MAP<any>) => Promise<boolean>
 * }}
 */
export const ds = (schema, table, columns) => {
  columns = [ID].concat(columns.filter(column => column !== ID))
  const validColumnNames = columns.reduce(a2o([]), CREATE(null))
  const isValidColumnName = name => name in validColumnNames
  return oop(dsMethods, schema, table, columns, isValidColumnName)
}
