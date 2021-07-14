import { $ } from '../js/$.js'
import { svgUse } from '../js/svg-use.js'

export default ade => {
  const test = (svg$, expected) => ade($(svg$).e.outerHTML, expected)

  test(svgUse('id'), '<svg><use xlink:href="#id"></use></svg>')

  test(svgUse('id', {
    a: { fill: '#000', stroke: '#000', width: 42, height: 42 }
  }), '<svg fill="#000" stroke="#000" width="42" height="42">' +
  '<use xlink:href="#id"></use></svg>')
}
