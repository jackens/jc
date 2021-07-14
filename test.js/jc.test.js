import { jc } from '../js/jc.js'
import { svgUse } from '../js/svg-use.js'

export default ade => {
  const svgUseConfig = {
    a: { fill: '#fff', stroke: '#fff', width: 17, height: 17 }
  }

  const button1 = jc({
    t: 'button',
    w: {
      a: { class: 'jc' }
    },
    c: {
      a: { 'aria-label': 'button' },
      i: [svgUse('icon-id', svgUseConfig), { t: 'div' }, { e: 'Button' }],
      k: {
        style: { marginLeft: 42, marginRight: 17 }, onclick: console.log
      }
    }
  })

  const button2 = jc({
    t: 'button',
    w_a: { class: 'jc' },
    c_k: {
      style: { marginLeft: 42, marginRight: 17 }, onclick: console.log
    },
    c_i: [svgUse('icon-id', svgUseConfig), { t: 'div' }, { e: 'Button' }],
    c_a: { 'aria-label': 'button' }
  })

  ade(button2, button1)

  const button3 = jc({
    t: 'button',
    w_a_class: 'jc',
    c_k_style: { marginLeft: 42, marginRight: 17 },
    c_k_onclick: console.log,
    'c_a_aria-label': 'button',
    text: 'Button',
    icon: 'icon-id'
  })

  ade(button3, button1)

  const button4 = jc({
    t: 'button',
    style: { marginLeft: 42, marginRight: 17 },
    onclick: console.log,
    text: 'Button',
    icon: 'icon-id',
    'aria-label': 'button'
  })

  ade(button4, button1)

  const file1 = jc({
    t: 'input',
    type: 'file',
    w: {
      a: { class: 'jc' }
    },
    l: {
      i: [{ e: 'Choose file…' }]
    }
  })

  const file2 = jc({
    t: 'input', type: 'file', text: 'Choose file…'
  })

  file2.i[0].a.id = file2.i[1].i[0].a.for = 'jc-1'

  ade(file2, file1)
}
