import { DOCUMENT } from '../js/common.js'
import { _typeof } from '../js/_typeof.js'

export default ade => {
  ade(_typeof(42), 'Number')
  ade(typeof 42, 'number')

  ade(_typeof(true), 'Boolean')
  ade(typeof true, 'boolean')

  ade(_typeof({}), 'Object')
  ade(typeof {}, 'object')

  ade(_typeof([]), 'Array')
  ade(typeof [], 'object')

  ade(_typeof(new Date()), 'Date')
  ade(typeof new Date(), 'object')

  ade(_typeof(/^(Reg)(Exp)$/), 'RegExp')
  ade(typeof /^(Reg)(Exp)$/, 'object')

  ade(_typeof('Jackens'), 'String')
  ade(typeof 'Jackens', 'string')

  ade(_typeof(_typeof), 'Function')
  ade(typeof _typeof, 'function')

  ade(_typeof(async () => { }), 'AsyncFunction')
  ade(typeof (async () => { }), 'function')

  ade(_typeof(DOCUMENT.createElement('DIV')), 'HTMLDivElement')
  ade(typeof DOCUMENT.createElement('DIV'), 'object')
}
