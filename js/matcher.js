/**
 * Set of tools for `MATCH`ing patterns without regular expressions.
 *
 * The reason for not using regular expressions is a ReDoS problem (see <https://en.wikipedia.org/wiki/ReDoS>). In addition, regular expressions, like finite-state machines, have no memory.
 *
 * - `TOTAL`: For the given `CHUNKS` returns the total matching length. For empty `CHUNKS` (i.e. `[]`) `undefined` is returned.
 * - `METADATA`: Returns `MATCH` function that returns `CHUNKS` returned by the given `MATCH` function with passed `metadata` element pushed to each `CHUNK`.
 * - `METADATA_RESET`: Returns `MATCH` function that returns `CHUNKS` returned by the given `MATCH` function restricted to the first elements with passed `metadata` element pushed to each `CHUNK`.
 * - `BEST_FIRST`: For the given `MATCHES` returns *first* `MATCH` function with largest `TOTAL` value.
 * - `BEST_LAST`: For the given `MATCHES` returns *last* `MATCH` function with largest `TOTAL` value.
 * - `OPTIONAL`: For the given `MATCH` function returns `MATCH` function that returns the same `CHUNKS` or `[[0]]` instead of `[]`.
 * - `MERGE`: For the given `MATCH` function returns `MATCH` function that returns `CHUNKS` containing single `CHUNK` with `TOTAL` value.
 * - `REPEAT`: For the given `MATCH` function returns a `MATCH` function that returns a concatenation of repeated matches.
 * - `CHAR`: Returns `MATCH` function that matches the given `char`.
 * - `NOT_CHAR`: Returns `MATCH` function that matches any character other than the given `char`.
 * - `CHARS`: Returns `MATCH` function that matches any of the given `chars`.
 * - `NOT_CHARS`: Returns `MATCH` function that matches any character except the given `chars`.
 * - `WORD`: Returns `MATCH` function that matches the given `word`.
 * - `NOT_WORD`: Returns `MATCH` function that matches the shortest string (of length at most `word.length - 1`) that is not a prefix of the given `word`.
 * - `WORDS`: Returns `MATCH` function that matches any of the given `words`.
 * - `matcher`: For the given `MATCH` function returns a function that returns `TOKENS` related with `CHUNKS` returned by multiple calls of the given `MATCH` function. The `matcher` function called with `BEST_FIRST` or `BEST_LAST` returns tokenizer.
 */

/**
 * @param {import('./common.js').CHUNKS} chunks
 * @returns {number | undefined}
 */
export const TOTAL = chunks => chunks.length === 0
  ? undefined
  : chunks.length === 1
    ? chunks[0][0]
    : chunks.reduce((result, chunk) => (result + (chunk[0] ?? 0)), 0)

/**
 * @param {any} metadata
 * @param {import('./common.js').MATCH} match
 * @returns {import('./common.js').MATCH}
 */
export const METADATA = (metadata, match) => charAt => {
  const chunks = match(charAt)
  for (const chunk of chunks) {
    chunk.push(metadata)
  }
  return chunks
}

/**
 * @param {any} metadata
 * @param {import('./common.js').MATCH} match
 * @returns {import('./common.js').MATCH}
 */
export const METADATA_RESET = (metadata, match) => charAt => {
  const chunks = match(charAt)
  for (const chunk of chunks) {
    chunk.splice(1, chunk.length, metadata)
  }
  return chunks
}

/**
 * @param {(a: number, b: number) => boolean} cmp
 * @param {import('./common.js').MATCHES} matches
 * @returns {import('./common.js').MATCH}
 */
const BEST = (cmp, matches) => charAt => {
  let bestChunks = [[]]
  let bestTotal = -1
  for (const match of matches) {
    const chunks = match(charAt)
    const total = TOTAL(chunks)
    if (total !== undefined && cmp(bestTotal, total)) {
      bestChunks = chunks
      bestTotal = total
    }
  }
  return bestChunks
}

/**
 * @type {(matches: import('./common.js').MATCHES) => import('./common.js').MATCH}
 */
export const BEST_FIRST = BEST.bind(null, (a, b) => a < b)

/**
 * @type {(matches: import('./common.js').MATCHES) => import('./common.js').MATCH}
 */
export const BEST_LAST = BEST.bind(null, (a, b) => a <= b)

/**
 * @param {import('./common.js').MATCH} match
 * @returns {import('./common.js').MATCH}
 */
export const OPTIONAL = match => charAt => {
  const chunks = match(charAt)
  return chunks.length > 0 ? chunks : [[0]]
}

/**
 * @param {import('./common.js').MATCH} match
 * @returns {import('./common.js').MATCH}
 */
export const MERGE = match => charAt => {
  const total = TOTAL(match(charAt))
  return total !== undefined && total >= 0 ? [[total]] : []
}

/**
 * @param {import('./common.js').MATCHES} matches
 * @returns {import('./common.js').MATCH}
 */
export const GROUP = matches => charAt => {
  const result = []
  let total = 0
  const charAtPlusTotal = pos => charAt(total + pos)
  for (const match of matches) {
    const chunks = match(charAtPlusTotal)
    const delta = TOTAL(chunks)
    if (delta === undefined) {
      return []
    }
    result.push(...chunks)
    total += delta
  }
  return result
}

/**
 * @param {import('./common.js').MATCH} match
 * @returns {import('./common.js').MATCH}
 */
export const REPEAT = match => charAt => {
  const result = []
  let total = 0
  const charAtPlusTotal = pos => charAt(total + pos)
  while (true) {
    if (charAtPlusTotal(0) === '') {
      return result
    }
    const chunks = match(charAtPlusTotal)
    const delta = TOTAL(chunks)
    if (delta === undefined) {
      return result.length > 0 ? result : []
    }
    result.push(...chunks)
    total += delta
  }
}

/**
 * @param {string} char
 * @returns {import('./common.js').MATCH}
 */
export const CHAR = char => charAt => charAt(0) === char ? [[1]] : []

/**
 * @param {string} char
 * @returns {import('./common.js').MATCH}
 */
export const NOT_CHAR = char => charAt => charAt(0) === char ? [] : [[1]]

/**
 * @param {import('./common.js').MAP<string>} chars
 * @returns {import('./common.js').MATCH}
 */
export const CHARS = chars => charAt => charAt(0) in chars ? [[1]] : []

/**
 * @param {import('./common.js').MAP<string>} chars
 * @returns {import('./common.js').MATCH}
 */
export const NOT_CHARS = chars => charAt => charAt(0) in chars ? [] : [[1]]

/**
 * @param {string} word
 * @returns {import('./common.js').MATCH}
 */
export const WORD = word => charAt => {
  let pos = 0
  for (; pos < word.length; ++pos) {
    if (charAt(pos) !== word[pos]) {
      return []
    }
  }
  return [[pos]]
}

/**
 * @param {string} word
 * @returns {import('./common.js').MATCH}
 */
export const NOT_WORD = word => charAt => {
  let pos = 0
  for (; pos < word.length; ++pos) {
    if (charAt(pos) !== word[pos]) {
      return [[pos + 1]]
    }
  }
  return []
}

/**
 * @param {string[]} words
 */
export const WORDS = words => BEST_FIRST(words.map(word => WORD(word)))

/**
 * @param {import('./common.js').MATCH} match
 * @returns {(text: string) => import('./common.js').TOKENS}
 */
export const matcher = match => text => {
  const result = []
  let start = 0
  let lastStart = 0
  while (start < text.length) {
    const chunks = match(pos => text.charAt(start + pos))
    const total = TOTAL(chunks)
    if (total !== undefined && total >= 0) {
      if (lastStart < start) {
        result.push([text.slice(lastStart, start)])
        lastStart = start
      }
      for (const chunk of chunks) {
        const end = start + (chunk[0] ?? 0)
        if (end <= start) {
          continue
        }
        chunk[0] = text.slice(start, end)
        result.push(chunk)
        lastStart = start = end
      }
    } else {
      ++start
    }
  }
  if (lastStart < text.length) {
    result.push([text.slice(lastStart)])
  }
  return result
}
