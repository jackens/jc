/**
 * Best strategy provider for “Nogi stonogi” board game.
 */

import { nogiStonogiData } from '../data.js/nogi-stonogi.data.js'
import { nogiStonogiStyle } from '../style.js/nogi-stonogi.style.js'
import { $ } from './$.js'
import { BODY } from './common.js'

window.onload = () => {
  $({ e: nogiStonogiStyle, p: BODY })

  const awardIsActive = {
    4: { 9: 1, 7: 1, 6: 1, 4: 1 },
    3: { 9: 1, 7: 1, 5: 1, 3: 1 },
    2: { 9: 1, 6: 1, 5: 1, 2: 1 }
  }

  let chances = 2
  let jokers = 4
  const colors = [
    { awards: 9, dices: 0, class: 'red' },
    { awards: 9, dices: 0, class: 'yellow' },
    { awards: 9, dices: 0, class: 'green' },
    { awards: 9, dices: 0, class: 'blue' },
    { awards: 9, dices: 0, class: 'black' }
  ]

  const updateAnswer = () => {
    colors.sort((a, b) => 10 * b.awards + b.dices - 10 * a.awards - a.dices)

    let totalDices = jokers
    const dices = []

    for (let i = 0; i < jokers; ++i) {
      dices.push('joker')
    }

    const state = `${jokers}${colors.map(color => {
      totalDices += color.dices

      for (let i = 0; i < color.dices; ++i) {
        dices.push(color.class)
      }

      return `${color.awards}${color.dices}`
    }).join('')}`

    $({
      ...answer$, k: { innerText: '' }
    })

    if (totalDices === 4) {
      const answer = parseInt(nogiStonogiData[state][chances - 1], 16).toString(2).split('')

      dices.filter((_, index) => +answer[index]).forEach(dice => $({
        t: 'div', p: answer$.e, a: { class: dice }
      }))
    } else {
      $({
        t: 'div', p: answer$.e, a: { class: 'wtf' }
      })
    }
  }

  const joker$ = $({
    t: 'div', p: BODY, a: { class: 'joker' }
  })

  $({
    t: 'div',
    p: joker$.e,
    a: { class: `chances chances-${chances}` },
    k: {
      onclick: e => {
        chances = 3 - chances
        e.target.className = `chances chances-${chances}`
        updateAnswer()
      }
    }
  })

  const jokerCount$ = $({
    t: 'div', p: joker$.e, a: { class: `count count-${jokers}` }
  })

  $({
    t: 'div',
    p: joker$.e,
    a: { class: 'minus' },
    k: {
      onclick: () => {
        jokers -= jokers > 0 ? 1 : 0
        jokerCount$.e.className = `count count-${jokers}`
        updateAnswer()
      }
    }
  })

  $({
    t: 'div',
    p: joker$.e,
    a: { class: 'plus' },
    k: {
      onclick: () => {
        jokers += jokers < 4 ? 1 : 0
        jokerCount$.e.className = `count count-${jokers}`
        updateAnswer()
      }
    }
  })

  colors.forEach(color => {
    const color$ = $({
      t: 'div',
      p: BODY,
      a: { class: color.class }
    });

    [4, 3, 2].forEach(award => $({
      t: 'div',
      p: color$.e,
      a: {
        class: `award award-${award}${awardIsActive[award][color.awards] > 0 ? '' : ' inactive'}`
      },
      k: {
        onclick: e => {
          color.awards += awardIsActive[award][color.awards] > 0 ? -award : award
          e.target.className =
            `award award-${award}${awardIsActive[award][color.awards] > 0 ? '' : ' inactive'}`
          updateAnswer()
        }
      }
    }))

    const colorCount$ = $({
      t: 'div', p: color$.e, a: { class: `count count-${color.dices}` }
    })

    $({
      t: 'div',
      p: color$.e,
      a: { class: 'minus' },
      k: {
        onclick: () => {
          color.dices -= color.dices > 0 ? 1 : 0
          colorCount$.e.className = `count count-${color.dices}`
          updateAnswer()
        }
      }
    })

    $({
      t: 'div',
      p: color$.e,
      a: { class: 'plus' },
      k: {
        onclick: () => {
          color.dices += color.dices < 4 ? 1 : 0
          colorCount$.e.className = `count count-${color.dices}`
          updateAnswer()
        }
      }
    })
  })

  const answer$ = $({
    t: 'div', p: BODY, a: { class: 'answer' }
  })

  updateAnswer()
}
