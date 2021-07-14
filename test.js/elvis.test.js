import { arr, get, obj, set } from '../js/elvis.js'

export default ade => {
  {
    const actual = {
      The: {
        answer: {
          to: {
            life: {
              the: {
                universe: {
                  and: {
                    everything: 42
                  }
                }
              }
            }
          }
        }
      }
    }

    ade(get(actual, ...arr`The answer to life the universe and everything`), 42)
    ade(get(actual, ...arr`The answer to life the Universe and everything`), undefined)
  }

  {
    const actual = { a: 42 }
    ade(get(actual, 'a'), 42)
  }

  {
    const actual = {}
    set(actual, ...arr`E l v i`).s = 42
    ade(actual, { E: { l: { v: { i: { s: 42 } } } } })
  }

  {
    const actual = arr`  The answer to life the universe and everything:
    ${42} is greater than ${17}   `
    const expected = [
      'The', 'answer', 'to', 'life', 'the', 'universe', 'and', 'everything:',
      '42', 'is', 'greater', 'than', '17'
    ]

    ade(actual, expected)
  }

  {
    const actual = {}
    set(actual).a = 42
    ade(actual, { a: 42 })
  }

  {
    const actual = obj`  The answer to life the universe and everything:
    ${42} is greater than ${17}   `
    const expected = {
      The: undefined,
      answer: undefined,
      to: undefined,
      life: undefined,
      the: undefined,
      universe: undefined,
      and: undefined,
      'everything:': undefined,
      42: undefined,
      is: undefined,
      greater: undefined,
      than: undefined,
      17: undefined
    }

    ade(actual, expected)

    ade('toString' in actual, false)
    ade('toString' in expected, true)
  }
}
