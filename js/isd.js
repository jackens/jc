/**
 * Set of helpers for full-text search.
 *
 * - `index`:  Method that indexes words from the given `textToIndex` text within the `id` identifier.
 * - `scores`: Method that searches for words from the given `textToSearch` text among indexed words (case sensitive). Returns a map of non-zero relevance coefficients for registered identifiers.
 * - `didYouMean`: For words of given text `textToSearch` returns suggestions of replacement, indexed words (case sensitive). Works based on *Levenshtein distances* with weights lowered to 0.3 for Polish diacritics.
 */
import { CREATE, KEYS } from './common.js'
import { oop } from './elvis.js'
import { _in } from './_in.js'

const SPLITTER = /[^0-9a-ząćęłńóśżź]+/i

const REPLACE_ACCENT_COST = {
  a: { ą: 1 },
  c: { ć: 1 },
  e: { ę: 1 },
  l: { ł: 1 },
  n: { ń: 1 },
  o: { ó: 1 },
  s: { ś: 1 },
  z: { ż: 1, ź: 1 },
  ą: { a: 1 },
  ć: { c: 1 },
  ę: { e: 1 },
  ł: { l: 1 },
  ń: { n: 1 },
  ó: { o: 1 },
  ś: { s: 1 },
  ż: { z: 1, ź: 1 },
  ź: { z: 1, ż: 1 }
}

/**
 * @param {import('./common.js').MAP<import('./common.js').MAP<number>>} _WORD_ID
 * @param {import('./common.js').MAP<number>} _WORD
 * @param {import('./common.js').MAP<number>} _ID
 * @param {string} textToIndex
 * @param {string} id
 */
const index = (_WORD_ID, _WORD, _ID, textToIndex, id) => {
  _ID[id] = _ID[id] ?? 0
  textToIndex.split(SPLITTER).forEach(word => {
    if (word.length) {
      word = word.toLowerCase()
      _WORD_ID[word] = _WORD_ID[word] ?? CREATE(null)
      _WORD_ID[word][id] = _WORD_ID[word][id] ?? 0
      ++_WORD_ID[word][id]
      _WORD[word] = _WORD[word] ?? 0
      ++_WORD[word]
      ++_ID[id]
    }
  })
}

/**
 * @param {import('./common.js').MAP<import('./common.js').MAP<number>>} _WORD_ID
 * @param {import('./common.js').MAP<number>} _WORD
 * @param {import('./common.js').MAP<number>} _ID
 * @param {string} textToSearch
 * @returns {import('./common.js').MAP<number>}
 */
const scores = (_WORD_ID, _WORD, _ID, textToSearch) => {
  const result = CREATE(null)
  textToSearch.split(SPLITTER).forEach(wordToFind => {
    if (wordToFind.length) {
      wordToFind = wordToFind.toLowerCase()
      KEYS(_WORD_ID).forEach(indexedWord => {
        if (indexedWord.includes(wordToFind)) {
          KEYS(_WORD_ID[indexedWord]).forEach(id => {
            if (id !== '_') {
              result[id] = result[id] ?? 0
              result[id] += wordToFind.length / indexedWord.length *
                _WORD_ID[indexedWord][id] / _ID[id] *
                _WORD_ID[indexedWord][id] / _WORD[indexedWord]
            }
          })
        }
      })
    }
  })
  return result
}

/**
 * @param {import('./common.js').MAP<import('./common.js').MAP<number>>} _WORD_ID
 * @param {import('./common.js').MAP<number>} _WORD
 * @param {import('./common.js').MAP<number>} _ID
 * @param {string} textToSearch
 * @returns {import('./common.js').MAP<number>}
 */
const didYouMean = (_WORD_ID, _WORD, _ID, textToSearch) => {
  const result = CREATE(null)
  textToSearch.split(SPLITTER).forEach(wordToFind => {
    if (wordToFind.length) {
      wordToFind = wordToFind.toLowerCase()
      if (!_in(wordToFind, _WORD_ID) && !_in(wordToFind, result)) {
        const distances = [CREATE(null), CREATE(null)]
        distances[0][-1] = 0
        for (let i = 0; i < wordToFind.length; ++i) {
          distances[0][i] = i + 1
        }
        const index = CREATE(null)
        KEYS(_WORD_ID).forEach(indexedWord => {
          const indexedWordLength = indexedWord.length
          let d = distances
          for (let i = 0; i < indexedWordLength; ++i) {
            const letter = indexedWord[i]
            if (!_in(letter, d[1])) {
              d[1][letter] = [CREATE(null), CREATE(null)]
              d[1][letter][0][-1] = d[0][-1] + 1
              for (let w = 0; w < wordToFind.length; w++) {
                d[1][letter][0][w] = Math.min(
                  d[1][letter][0][w - 1] + 1,
                  d[0][w] + 1,
                  d[0][w - 1] + (
                    wordToFind[w] === letter
                      ? 0
                      : _in(letter, REPLACE_ACCENT_COST) && _in(wordToFind[w], REPLACE_ACCENT_COST[letter])
                        ? 0.3
                        : 1
                  )
                )
              }
            }
            d = d[1][letter]
          }
          index[indexedWord] = d[0][wordToFind.length - 1]
        })
        const suggestions = KEYS(index).sort((a, b) =>
          (index[a] - index[b]) || (_WORD_ID[b].length - _WORD_ID[a].length))
        if (suggestions.length) {
          result[wordToFind] = suggestions[0]
        }
      }
    }
  })
  return result
}

const methods = { index, scores, didYouMean }

/**
 * @returns {{
 *   index:      (textToIndex:  string, id: string) => void
 *   scores:     (textToSearch: string) => import('./common.js').MAP<number>
 *   didYouMean: (textToSearch: string) => import('./common.js').MAP<number>
 * }}
 */
export const ids = () => oop(methods, CREATE(null), CREATE(null), CREATE(null))
