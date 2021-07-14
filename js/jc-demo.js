/**
 * `jc` converter usage demo.
 */

import doc from '../_icons-out/framework7io-framework7-icons/doc.js'
import paperplane from '../_icons-out/framework7io-framework7-icons/paperplane.js'
import photo from '../_icons-out/framework7io-framework7-icons/photo.js'
import { $ } from './$.js'
import { BODY } from './common.js'
import { jcStyle } from '../style.js/jc.style.js'
import { jc } from './jc.js'
import { svg } from './svg.js'

window.onload = () => {
  $({ e: svg(doc, paperplane, photo), p: BODY })
  $({ e: jcStyle, p: BODY })

  const items = [{
    t: 'option', k: { value: 0 }, i: [{ e: 'zero' }]
  }, {
    t: 'option', k: { value: 1 }, i: [{ e: 'one' }]
  }, {
    t: 'option', k: { value: 2 }, i: [{ e: 'two' }]
  }, {
    t: 'option', k: { value: 3 }, i: [{ e: 'three' }]
  }, {
    t: 'option', k: { value: 4 }, i: [{ e: 'four' }]
  }, {
    t: 'option', k: { value: 5 }, i: [{ e: 'five' }]
  }, {
    t: 'option', k: { value: 6 }, i: [{ e: 'six' }]
  }, {
    t: 'option', k: { value: 7 }, i: [{ e: 'seven' }]
  }, {
    t: 'option', k: { value: 8 }, i: [{ e: 'eight' }]
  }, {
    t: 'option', k: { value: 9 }, i: [{ e: 'nine' }]
  }]

  const preview$ = $({
    t: 'div',
    k: {
      style: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        height: '100%',
        margin: '0 auto 0 auto'
      }
    }
  })

  const file$ = jc({
    type: 'file',
    label: 'Choose photo',
    accept: '.png,.jpg,.jpeg,.gif',
    onchange: e => {
      const input = e.target
      if (input !== null) {
        const files = input.files
        if (files !== null && files.length) {
          const reader = new window.FileReader()
          reader.onload = e2 => {
            const fileReader = e2.target
            if (fileReader !== null) {
              $({
                t: 'img',
                a: { src: fileReader.result },
                k: {
                  onload: e3 => {
                    const img = e3.target
                    if (img !== null) {
                      const m = img.src.match(/data:(image\/.+?);/)
                      if (m !== null) {
                        const MAX_WIDTH_HEIGHT = 200
                        const canvas = $({ t: 'canvas' }).e
                        let context = canvas.getContext('2d')
                        if (context !== null) {
                          context.drawImage(img, 0, 0)
                        }

                        let width = img.width
                        let height = img.height

                        if (width > height) {
                          if (width > MAX_WIDTH_HEIGHT) {
                            height *= MAX_WIDTH_HEIGHT / width
                            width = MAX_WIDTH_HEIGHT
                          }
                        } else {
                          if (height > MAX_WIDTH_HEIGHT) {
                            width *= MAX_WIDTH_HEIGHT / height
                            height = MAX_WIDTH_HEIGHT
                          }
                        }
                        canvas.width = width
                        canvas.height = height

                        context = canvas.getContext('2d')
                        if (context !== null) {
                          context.drawImage(img, 0, 0, width, height)
                        }

                        const dataUrl = canvas.toDataURL(m[1])

                        preview$.e.style.backgroundImage = 'url(' + dataUrl + ')'
                      }
                    }
                  }
                }
              })
            }
          }
          reader.readAsDataURL(files[0])
        }
      }
    },
    icon: 'photo',
    text: 'Choose photo…'
  })

  $({
    e: BODY,
    i: [jc({
      t: 'textarea',
      class: 'jc w-1-4 w-1-2 h-4-4 h-3-2 h-2-1',
      label: 'Textarea',
      placeholder: 'Textarea'
    }), jc({
      t: 'div',
      class: 'jc w-1-4 w-1-2 h-4-4 h-3-2 h-2-1',
      label: 'Content editable',
      placeholder: 'Content editable',
      c_a_class: 'contenteditable',
      contenteditable: true
    }), jc({
      t: 'select',
      class: 'jc w-1-4 w-1-2 h-4-4 h-3-2 h-2-1',
      label: 'Select multiple',
      multiple: true,
      c_i: items
    }), {
      t: 'div',
      a: { class: 'jc group w-1-4 w-1-2 h-4-4 h-3-2 h-3-1' },
      i: [{
        t: 'div',
        a: {
          class: 'jc h-3-4 h-2-2 h-2-1',
          label: 'Normalized photo (max width/height = 200px)'
        },
        i: [preview$]
      }, file$]
    }, jc({
      type: 'text',
      class: 'jc w-1-4 w-1-2',
      label: 'Login',
      placeholder: 'Login'
    }), jc({
      type: 'password',
      class: 'jc w-1-4 w-1-2',
      label: 'Password',
      placeholder: 'Password',
      style: { borderColor: 'red' }
    }), jc({
      type: 'email',
      class: 'jc w-1-4 w-1-2',
      label: 'E-mail',
      placeholder: 'email@example.com'
    }), jc({
      type: 'email',
      class: 'jc w-1-4 w-1-2',
      label: 'Confirm e-mail',
      placeholder: 'email@example.com'
    }), jc({
      type: 'button',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'input[type=button] (red)',
      text: 'Button',
      style: { backgroundColor: 'red' }
    }), jc({
      type: 'submit',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'input[type=submit] (green)',
      text: 'Button',
      style: { backgroundColor: 'green' }
    }), jc({
      type: 'reset',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'input[type=reset] (blue)',
      text: 'Button',
      style: { backgroundColor: 'blue' }
    }), jc({
      t: 'button',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'Button',
      icon: 'paperplane',
      text: 'Button'
    }), jc({
      type: 'file',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'Choose file',
      icon: 'doc',
      text: 'Choose file…'
    }), jc({
      type: 'color',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'Color',
      value: '#FACE42'
    }), jc({
      t: 'meter',
      class: 'jc w-1-4 w-1-2',
      label: 'Meter',
      hight: 64,
      low: 4,
      max: 100,
      min: 0,
      optimum: 42,
      value: 42
    }), jc({
      t: 'progress',
      class: 'jc w-1-4 w-1-2',
      label: 'Progress',
      max: 100,
      value: 42
    }), jc({
      type: 'range', class: 'jc w-2-4', label: 'Range'
    }), jc({
      type: 'checkbox',
      class: 'jc w-1-2 w-1-4',
      text: 'checkbox 1',
      checked: true
    }), jc({
      type: 'checkbox',
      class: 'jc w-1-2 w-1-4',
      text: 'checkbox 2'
    }), jc({
      type: 'radio',
      class: 'jc w-1-2 w-1-4',
      name: 'radio',
      text: 'radio 1'
    }), jc({
      type: 'radio',
      class: 'jc w-1-2 w-1-4',
      name: 'radio',
      text: 'radio 2'
    }), jc({
      type: 'number',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'The answer to life the universe and everything',
      value: 42
    }), jc({
      t: 'select', class: 'jc w-1-6 w-1-3 w-1-2', label: 'Select', c_i: items
    }), {
      t: 'datalist', a: { id: 'datalist' }, i: items
    }, jc({
      type: 'text',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'list=datalist',
      list: 'datalist',
      placeholder: 'Select…'
    }), jc({
      type: 'search',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'Search',
      placeholder: 'Search…'
    }), jc({
      type: 'phone',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'Phone',
      placeholder: '+48 123 456 789'
    }), jc({
      type: 'url',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'Url',
      placeholder: 'https://example.com/'
    }), jc({
      type: 'date', class: 'jc w-1-6 w-1-3 w-1-2', label: 'From'
    }), jc({
      type: 'date', class: 'jc date w-1-6 w-1-3 w-1-2', label: 'To'
    }), jc({
      type: 'datetime-local',
      class: 'jc w-1-6 w-1-3 w-1-2',
      label: 'Date and time'
    }), jc({
      type: 'time', class: 'jc w-1-6 w-1-3 w-1-2', label: 'Time'
    }), jc({
      type: 'month', class: 'jc w-1-6 w-1-3 w-1-2', label: 'Month'
    }), jc({
      type: 'week', class: 'jc w-1-6 w-1-3 w-1-2', label: 'Week'
    })]
  })
}
