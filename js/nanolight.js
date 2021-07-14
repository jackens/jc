/**
 * Simple JavaScript syntax highlighter.
 */

import { arr, obj } from './elvis.js'
import { BEST_FIRST, CHAR, CHARS, GROUP, matcher, MERGE, METADATA, NOT_CHAR, NOT_CHARS, NOT_WORD, OPTIONAL, REPEAT, WORD, WORDS } from './matcher.js'

const _0_9 = '0 1 2 3 4 5 6 7 8 9'
const A_Z = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'
const IDENTIFIER_AT_0 = `${A_Z} ${A_Z.toLowerCase()} $ _`

const SKIP_WHITESPACE = OPTIONAL(MERGE(REPEAT(CHARS({ ' ': 1, '\n': 1, '\r': 1, '\t': 1 }))))

const COMMENT = (begin, end) => METADATA('COMMENT', GROUP([
  METADATA('BEGIN', WORD(begin)),
  METADATA('BODY', MERGE(REPEAT(NOT_WORD(end)))),
  METADATA('END', WORD(end))
]))

const ESC = METADATA('ESC', MERGE(REPEAT(GROUP([CHAR('\\'), NOT_CHAR('')]))))

const STRING = char => METADATA('STRING', GROUP([
  METADATA('BEGIN', CHAR(char)),
  OPTIONAL(REPEAT(
    BEST_FIRST([
      ESC,
      METADATA('BODY', MERGE(REPEAT(NOT_CHARS(obj`${char} \\`))))
    ]))),
  METADATA('END', CHAR(char))
]))

const IDENTIFIER = MERGE(GROUP([
  CHARS(obj`${IDENTIFIER_AT_0}`),
  OPTIONAL(MERGE(REPEAT(CHARS(obj`${IDENTIFIER_AT_0} ${_0_9}`))))
]))

const INT = (char, digits) => METADATA('NUMBER', MERGE(GROUP([
  CHAR('0'),
  CHARS(obj`${char} ${char.toUpperCase()}`),
  MERGE(REPEAT(CHARS(digits)))
])))

const CHARS_0_9 = CHARS(obj`${_0_9}`)

const OPTIONAL_MERGE_REPEAT_CHARS_0_9 = OPTIONAL(MERGE(REPEAT(CHARS_0_9)))

const OPERATOR_CHAR_PERIOD = METADATA('OPERATOR', CHAR('.'))

const OPTIONAL_EXP = OPTIONAL(MERGE(GROUP([
  CHARS(obj`E e`),
  OPTIONAL(CHAR('-')),
  CHARS_0_9,
  OPTIONAL_MERGE_REPEAT_CHARS_0_9
])))

const matcherJs = matcher(BEST_FIRST([
  STRING('"'),
  STRING('`'),
  STRING("'"),

  METADATA('JSDOC', GROUP([
    SKIP_WHITESPACE,
    COMMENT('/**', '*/'),
    SKIP_WHITESPACE
  ])),

  COMMENT('/*', '*/'),
  COMMENT('//', '\n'),

  ESC,

  METADATA('IDENTIFIER', IDENTIFIER),

  GROUP([
    METADATA('TAGGED', IDENTIFIER),
    SKIP_WHITESPACE,
    STRING('`')
  ]),

  GROUP([
    OPERATOR_CHAR_PERIOD,
    SKIP_WHITESPACE,
    METADATA('PROPERTY', IDENTIFIER)
  ]),

  GROUP([
    METADATA('FUNCTION', IDENTIFIER),
    SKIP_WHITESPACE,
    CHAR('(')
  ]),

  GROUP([
    OPERATOR_CHAR_PERIOD,
    SKIP_WHITESPACE,
    METADATA('METHOD', IDENTIFIER),
    SKIP_WHITESPACE,
    CHAR('(')
  ]),

  METADATA('NUMBER', BEST_FIRST([
    MERGE(GROUP([
      CHARS_0_9,
      OPTIONAL_MERGE_REPEAT_CHARS_0_9,
      OPTIONAL_EXP
    ])),
    MERGE(GROUP([
      OPERATOR_CHAR_PERIOD,
      CHARS_0_9,
      OPTIONAL_MERGE_REPEAT_CHARS_0_9,
      OPTIONAL_EXP
    ])),
    MERGE(GROUP([
      CHARS_0_9,
      OPTIONAL_MERGE_REPEAT_CHARS_0_9,
      OPERATOR_CHAR_PERIOD,
      OPTIONAL_MERGE_REPEAT_CHARS_0_9,
      OPTIONAL_EXP
    ]))
  ])),

  INT('b', obj`0 1`),
  INT('o', obj`0 1 2 3 4 5 6 7`),
  INT('x', obj`${_0_9} A B C D E F a b c d e f`),

  METADATA('OPERATOR', WORDS(
    arr`! != !== % %= & && &&= &= * ** **= *= + ++ += , - -- -= . ... / /= :
< << <<= <= = == === > >= >> >>= >>> >>>= ? ?. ?? ??= ^ ^=
delete in instanceof new of super typeof void | |= || ||= ~`)),

  METADATA('ARROW', WORD('=>'))
]))

const NO_COLOR = e => [{ e }]

const COLOR = (color, e) => [{
  t: 'span', a: { style: `color:#${color}` }, i: [{ e }]
}]

const BLUE = COLOR.bind(0, '6de')
const GREEN = COLOR.bind(0, 'ad3')
const GREY = COLOR.bind(0, '776')
const ORANGE = COLOR.bind(0, 'f92')
const PURPLE = COLOR.bind(0, 'a8f')
const RED = COLOR.bind(0, 'f27')
// const WHITE = COLOR.bind(0, 'ffe')
const YELLOW = COLOR.bind(0, 'ed7')

const WORDS_BLUE = obj`const function let var`
const WORDS_PURPLE = obj`NaN false null true undefined`
const WORDS_RED = obj`async await break case catch continue debugger default delete do else export finally for from if import in new of return switch try typeof void while with yields`
const WORDS_ORANGE = obj`arguments super this`

const IDENTIFIER_COLOR = DEFAULT => text => text in WORDS_BLUE
  ? BLUE(text)
  : text in WORDS_PURPLE
    ? PURPLE(text)
    : text in WORDS_RED
      ? RED(text)
      : text in WORDS_ORANGE
        ? ORANGE(text)
        : DEFAULT(text)

const colors = {
  ARROW: BLUE,

  BEGIN_COMMENT: GREY,
  BEGIN_STRING: YELLOW,

  BODY_COMMENT: GREY,
  BODY_STRING: YELLOW,

  END_COMMENT: GREY,
  END_STRING: YELLOW,

  ESC_STRING: PURPLE,
  ESC: PURPLE,

  FUNCTION: IDENTIFIER_COLOR(GREEN),
  IDENTIFIER: IDENTIFIER_COLOR(NO_COLOR),
  METHOD: IDENTIFIER_COLOR(GREEN),
  PROPERTY: NO_COLOR,
  TAGGED: IDENTIFIER_COLOR(GREEN),

  NUMBER: PURPLE,

  OPERATOR: RED
}

/**
 * @param {string} code
 * @returns {string}
 */
export const nanolight = code => {
  const i = []

  matcherJs(code).forEach(chunk => {
    if (chunk.length > 1) {
      const key = chunk.slice(1).join('_')
      if (key in colors) {
        i.push(colors[key](chunk[0])[0])
        return
      }
    }
    i.push(NO_COLOR(chunk[0])[0])
  })

  return {
    t: 'pre', a: { style: 'background-color:#222;color:#ffe' }, i
  }
}
