import { _in } from '../js/_in.js'

export default ade => {
  const ob = { key: 'K', null: 'N' }

  ade('key' in ob, true)
  ade(_in('key', ob), true)

  ade('null' in ob, true)
  ade(_in('null', ob), true)

  ade(null in ob, true)
  ade(_in(null, ob), false)

  ade('toString' in ob, true)
  ade(_in('toString', ob), false)
}
