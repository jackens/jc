import { $ } from '../js/$.js'

export default ade => {
  const test = (element$, expected) => ade(element$.e.outerHTML, expected)

  test($({
    t: 'b',
    i: [{
      t: 'i', k: { className: 'some class', innerText: 'text' }
    }]
  }), '<b><i class="some class">text</i></b>')

  const b = $({ t: 'b' })

  test(b, '<b></b>')

  const i = $({
    t: 'i', i: [{ e: 'text' }], p: b.e
  })

  test(i, '<i>text</i>')
  test(b, '<b><i>text</i></b>')

  $({
    e: i.e, k: { className: 'some class' }
  })

  test(i, '<i class="some class">text</i>')
  test(b, '<b><i class="some class">text</i></b>')

  test($({
    t: 'span', k: { className: 'some class' }, i: [{ e: 0 }]
  }), '<span class="some class">0</span>')
  test($({
    t: 'span', k: { className: 'some class', innerText: 'one' }
  }), '<span class="some class">one</span>')

  test($({
    t: 'div',
    k: {
      style: { margin: 0 }
    }
  }), '<div style="margin: 0px;"></div>')

  test($({
    t: 'div',
    k: { className: 'some class' },
    i: [{
      t: 'b', i: [{ e: 'bold 1' }]
    }, {
      t: 'b', i: [{ e: 'bold 2' }]
    }, {
      t: 'i', i: [{ e: 'italic' }]
    }]
  }), '<div class="some class"><b>bold 1</b><b>bold 2</b><i>italic</i></div>')

  const input1 = $({
    t: 'input', k: { value: 42 }
  })
  const input2 = $({
    t: 'input', a: { value: 42 }
  })

  ade(input1.e.value, '42')
  ade(input2.e.value, '42')
  test(input1, '<input>')
  test(input2, '<input value="42">')
}
