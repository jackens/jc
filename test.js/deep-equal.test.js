import { CREATE } from '../js/common.js'
import { deepEqual } from '../js/deep-equal.js'

export default ade => {
  const keys = 'abcdefghilklmnopqrstuvwxyz0123456789_$'.split('')
  const a = [{}, {}, {}]
  const t = [a[0], a[1], a[2]]

  for (let i = 0; i < t.length; ++i) {
    for (let k = 0; k < 10000; ++k) {
      t[i] = t[i][keys[k % keys.length]] = {}
    }
    t[i].deepest = !i
    // console.log(JSON.stringify(a[i])) // Maximum call stack size exceeded
  }

  ade(deepEqual(a[0], a[1]), false)
  ade(deepEqual(a[0], a[2]), false)
  ade(deepEqual(a[1], a[2]), true)

  ade(deepEqual(CREATE(null), {}), true)
}
