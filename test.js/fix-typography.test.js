import { $ } from '../js/$.js'
import { fixTypography } from '../js/fix-typography.js'

export default ade => {
  const p = $({
    t: 'p',
    k: {
      innerHTML: 'a b c d e f g h i j k l m n o p q r s t u v w x y z ' +
        'https://example.com ' +
        '<a href="https://example.com">https://example.com</a>'
    }
  }).e

  fixTypography(p)

  ade(p.outerHTML.replace(/\u200B/g, '&#x200B;'),
    '<p>a b c d e f g h ' +
    '<span class="nbsp">i </span>j k l m n ' +
    '<span class="nbsp">o </span>p q r s t ' +
    '<span class="nbsp">u </span>v ' +
    '<span class="nbsp">w </span>x y ' +
    '<span class="nbsp">z </span>' +
    'https:/&#x200B;/&#x200B;example.&#x200B;com ' +
    '<a href="https://example.com">' +
    'https:/&#x200B;/&#x200B;example.&#x200B;com' +
    '</a></p>')
}
