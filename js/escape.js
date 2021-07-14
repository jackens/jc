/**
 * Helper for creating secure SQL queries.
 *
 * - `value`: Helper for escaping values.
 * - `name`:  Helper for escaping column, table and schema names.
 * - `type`:  Methods that implement value escape for particular types.
 * - `query`: Tagged Template Literal helper for creating secure SQL queries.
 */

import { _typeof } from './_typeof.js'

const GRAVE = '`'

/**
 * @param {null | undefined} value
 * @returns {string}
 */
const escapeNull = value => 'NULL'

export const escape = {
  /**
   * @param {any} value
   * @returns {string}
   */
  value: value => escape.type?.[_typeof(value)]?.(value) ?? value,

  /**
   * @param {string} name
   * @returns {string}
   */
  name: name => GRAVE + name.replace(/`/g, GRAVE + GRAVE) + GRAVE,

  /**
   * @type {import('./common.js').MAP<(value: any) => string>}
   */
  type: {
    /**
     * @param {any[]} value
     * @returns {string}
     */
    Array: value => value.map(escape.value).join(),
    /**
     * @param {boolean} value
     * @returns {string}
     */
    Boolean: value => `b'${+value}'`,
    /**
     * @param {Date} value
     * @returns {string}
     */
    Date: value => "'" + value.toISOString().replace(/^(.+)T(.+)\..*$/, '$1 $2') + "'",
    Null: escapeNull,
    /**
     * @param {string} value
     * @returns {string}
     */
    String: value => "'" + value.replace(/'/g, "''") + "'",
    Undefined: escapeNull
  },

  /**
   * @param {TemplateStringsArray} template
   * @param {any[]} substitutions
   * @returns {string}
   */
  query: (template, ...substitutions) => String.raw(template, ...substitutions.map(escape.value))
}
