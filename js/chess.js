/**
 * Simple chess application showing attack/defense counters.
 */

import icons from '../_icons-out/chess-alpha.js'
import { $ } from './$.js'
import { chessStyle } from '../style.js/chess.style.js'
import { svg } from './svg.js'
import { BODY } from './common.js'
import { obj } from './elvis.js'
import { svgUse } from './svg-use.js'

const ID = {
  b: 'black-bishop',
  k: 'black-king',
  n: 'black-knight',
  p: 'black-pawn',
  q: 'black-queen',
  r: 'black-rook',
  B: 'white-bishop',
  K: 'white-king',
  N: 'white-knight',
  P: 'white-pawn',
  Q: 'white-queen',
  R: 'white-rook'
}

const EMPTY = '-'

const STARTING_POSITION = 'RNBQKBNRPPPPPPPP--------------------------------pppppppprnbqkbnr'

const it = [0, 1, 2, 3, 4, 5, 6, 7]

const isLegalSquare = ([y, x]) => x >= 0 && y >= 0 && x <= 7 && y <= 7

window.onload = () => {
  $({
    e: BODY,
    i: [{
      e: svg(Object.values(icons))
    }, {
      e: chessStyle, p: BODY
    }]
  })

  let selected
  const params = new URL(window.location).searchParams
  const rotate = params.has('rotate')
  const position = params.get('position') ?? STARTING_POSITION
  const board = it.map(y => it.map(x => {
    const piece = position[(y << 3) + x]
    return { black: 0, white: 0, piece: piece in ID ? piece : EMPTY }
  }))

  it.forEach(y => it.forEach(x => {
    const backgroundColor = ((x + y) & 1) !== 0 ? '#ffd' : '#86a666'
    const div = board[y][x].div = $({
      t: 'div',
      p: BODY,
      k: {
        style: {
          backgroundColor,
          left: `calc(50vw - 50vmin + 12.5vmin * ${rotate ? 7 - x : x})`,
          top: `calc(50vh - 50vmin + 12.5vmin * ${rotate ? y : 7 - y})`
        },
        onclick: () => {
          if (selected !== undefined) {
            if (selected.x === x && selected.y === y) {
              selected.div.style.backgroundColor = selected.backgroundColor
              selected = undefined
            } else {
              board[y][x].piece = board[selected.y][selected.x].piece
              board[selected.y][selected.x].piece = EMPTY
              window.location.search = 'position=' +
                it.map(y => it.map(x => board[y][x].piece).join('')).join('') +
                (rotate ? '&rotate' : '')
            }
          } else {
            selected = { div, x, y, backgroundColor }
            div.style.backgroundColor = '#c64'
          }
        }
      }
    }).e

    const piece = board[y][x].piece

    if (piece !== EMPTY) {
      $({ ...svgUse(ID[piece]), p: div })

      const color = ID[piece].split(EMPTY)[0]
      const updateStats = ([yy, xx]) => ++board[yy][xx][color]
      const updateLineStats = ([yo, xo, yy = y + yo, xx = x + xo]) => {
        while (isLegalSquare([yy, xx])) {
          updateStats([yy, xx])
          if (board[yy][xx].piece !== EMPTY) {
            break
          }
          yy += yo
          xx += xo
        }
      }

      if (piece in obj`K k`) {
        [
          [y - 1, x - 1], [y - 1, x + 1], [y - 1, x],
          [y + 1, x - 1], [y + 1, x + 1], [y + 1, x],
          [y, x - 1], [y, x + 1]
        ].filter(isLegalSquare).forEach(updateStats)
      } else if (piece in obj`N n`) {
        [
          [y - 1, x - 2], [y - 1, x + 2],
          [y - 2, x - 1], [y - 2, x + 1],
          [y + 1, x - 2], [y + 1, x + 2],
          [y + 2, x - 1], [y + 2, x + 1]
        ].filter(isLegalSquare).forEach(updateStats)
      } else if (piece in obj`P p`) {
        const yy = color === 'white' ? y + 1 : y - 1;
        [[yy, x - 1], [yy, x + 1]].filter(isLegalSquare).forEach(updateStats)
      } else {
        if (piece in obj`Q q R r`) {
          [[-1, 0], [0, -1], [0, 1], [1, 0]].forEach(updateLineStats)
        }
        if (piece in obj`Q q B b`) {
          [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(updateLineStats)
        }
      }
    }
  }))

  it.forEach(y => it.forEach(x => {
    const diff = board[y][x].white - board[y][x].black
    if (!(board[y][x].piece in obj`K k -`)) {
      $({
        e: board[y][x].div,
        i: [{
          t: 'div',
          k: {
            style: {
              color: (rotate && diff > 0) || (!rotate && diff < 0) ? '#f42' : '#4f2'
            }
          },
          i: [{ e: diff < 0 ? -diff : diff }]
        }]
      })
    }
  }))
}
