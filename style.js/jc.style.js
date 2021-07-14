/**
 * CSS rules for `jc` converter in `JS2CSS` format — component styles and component layout system.
 *
 * The component layout system contains only two types of classes:
 *
 * - `.w-«w»-«sw»`: width  of `«w»` slots when the screen is **wide** enough for `«sw»` slots.
 * - `.h-«h»-«sw»`: height of `«h»` slots when the screen is **wide** enough for `«sw»` slots.
 *
 * The minimum slot width is 200 pixels.
 *
 * Example. Components defined as follows:
 *
 * ```js
 * import { $ } from '../js/$.js'
 * import { jc } from '../js/jc.js'
 * import { jcStyle } from '../style.js/jc.style.js'
 *
 * window.onload = () => $({
 *   e: document.body,
 *   i: [{ e: jcStyle }, jc({
 *     label: 'Component #1', class: 'jc w-1-3 w-1-2', text: 'jc w-1-3 w-1-2'
 *   }), jc({
 *     label: 'Component #2', class: 'jc w-1-3 w-1-2', text: 'jc w-1-3 w-1-2'
 *   }), jc({
 *     label: 'Component #3', class: 'jc w-1-3', text: 'jc w-1-3'
 *   })]
 * })
 * ```
 *
 * on a screen at least 600 pixels wide, will be arranged on a single line:
 *
 * ![](https://jackens.github.io/png/jc-css-1.png)
 *
 * on a screen less than 600 pixels wide, but not less than 400 pixels wide, will be arranged in two lines:
 *
 * ![](https://jackens.github.io/png/jc-css-2.png)
 *
 * while on a screen less than 400 pixels wide, they will be arranged in three rows:
 *
 * ![](https://jackens.github.io/png/jc-css-3.png)
 */
import { EMPTY_STRING } from '../js/common.js'
import { style } from '../js/style.js'

const fontFamily = 'Arial,Helvetica,sans-serif'
const focusColor = '0,119,255'
const mainColor = '0,85,187'
const backgroundColor = `rgb(${mainColor})`

/**
 * @type {import('./common.js').JS2CSS}
 */
const jcCss = {
  '.jc': {
    boxSizing: 'border-box',
    float: 'left',
    fontFamily,
    fontSize: 0,
    height: '45px',
    margin: '20px 0 0 0',
    padding: '3px',
    position: 'relative',
    width: '100%',
    ' :focus': {
      outline: 0,
      boxShadow: `0 0 0 1px rgb(${focusColor})`
    },
    ' ::-moz-focus-inner': {
      border: 0
    },
    ' ::-webkit-input-placeholder, ::-moz-placeholder, ::placeholder': {
      color: '#888',
      opacity: 1
    },
    ' :-ms-input-placeholder': {
      color: '#888!important',
      opacity: 1
    },
    ' [disabled]': {
      cursor: 'not-allowed',
      '::-webkit-input-placeholder,::-moz-placeholder,::placeholder': {
        color: '#ccc',
        opacity: 1
      },
      ':-ms-input-placeholder': {
        color: '#ccc!important',
        opacity: 1
      }
    },
    ':before': {
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      color: '#333',
      fontFamily,
      fontSize: '14px',
      height: '20px',
      left: 0,
      lineHeight: '20px',
      overflow: 'hidden',
      paddingLeft: '6px',
      position: 'absolute',
      textAlign: 'left',
      textOverflow: 'ellipsis',
      top: '-20px',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      width: '100%'
    },
    ':not(.no-label):before': {
      content: 'attr(label)'
    },
    '>:not(.jc)': {
      borderRadius: '4px',
      boxSizing: 'border-box',
      fontFamily,
      fontSize: '17px',
      height: '100%',
      lineHeight: '19px',
      margin: 0,
      width: '100%'
    },
    '>button': {
      backgroundColor,
      border: 0,
      color: '#fff',
      display: 'block',
      fontWeight: 'bold',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      userSelect: 'none',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      '>svg': {
        boxSizing: 'border-box',
        display: 'inline',
        position: 'relative',
        verticalAlign: 'middle'
      },
      '>div': {
        display: 'inline-block',
        width: '10px'
      },
      ':hover': {
        boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.2)'
      },
      ':active': {
        boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.4)'
      },
      '[disabled]': {
        boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.4)'
      }
    },
    '>input': {
      backgroundColor: '#fff',
      border: 'solid #999 1px',
      color: '#444',
      padding: '5px 10px 5px 10px',
      '[disabled]': {
        border: 'solid #ccc 1px',
        color: '#666'
      },
      '+div': {
        boxSizing: 'border-box',
        height: '100%',
        left: 0,
        padding: '3px',
        position: 'absolute',
        top: 0,
        width: '100%',
        '>label': {
          border: 0,
          borderRadius: '4px',
          boxSizing: 'border-box',
          display: 'block',
          fontFamily,
          fontSize: '17px',
          height: '100%',
          lineHeight: '19px',
          margin: 0,
          overflow: 'hidden',
          padding: '10px',
          textOverflow: 'ellipsis',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          width: '100%'
        }
      },
      '[type="button"],[type="reset"],[type="submit"]': {
        backgroundColor,
        border: 0,
        color: '#fff',
        fontWeight: 'bold',
        userSelect: 'none',
        ':hover': {
          boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.2)'
        },
        ':active': {
          boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.4)'
        },
        '[disabled]': {
          boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.4)'
        }
      },
      '[type="checkbox"],[type="radio"]': {
        height: '19px',
        margin: '10px',
        width: '19px',
        '+div>label': {
          color: '#333',
          paddingLeft: '40px',
          textAlign: 'left',
          ':hover': {
            boxShadow: `inset 0 0 0 42px rgba(${mainColor},0.1)`
          },
          ':active': {
            boxShadow: `inset 0 0 0 42px rgba(${mainColor},0.2)`
          }
        },
        '[disabled]+div>label': {
          boxShadow: 'none',
          color: '#777',
          cursor: 'not-allowed'
        }
      },
      '[type="color"]': {
        backgroundColor,
        border: 0,
        color: '#fff',
        fontWeight: 'bold',
        ':hover': {
          boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.2)'
        },
        ':active': {
          boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.4)'
        },
        '[disabled]': {
          boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.4)'
        }
      },
      '[type="file"]': {
        userSelect: 'none',
        '+div>label': {
          '>svg': {
            boxSizing: 'border-box',
            display: 'inline',
            position: 'relative',
            verticalAlign: 'middle'
          },
          '>div': {
            display: 'inline-block',
            width: '10px'
          },
          backgroundColor,
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center'
        },
        ':hover+div>label': {
          boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.2)'
        },
        ':active+div>label': {
          boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.4)'
        },
        '[disabled]+div>label': {
          boxShadow: 'inset 0 0 0 42px rgba(255,255,255,0.4)',
          cursor: 'not-allowed'
        }
      }
    },
    '>.contenteditable': {
      backgroundColor: '#fff',
      border: 'solid #999 1px',
      color: '#444',
      overflow: 'auto',
      padding: '5px 10px 5px 10px',
      ':empty:before': {
        color: '#888',
        content: 'attr(placeholder)',
        display: 'block',
        opacity: 1
      },
      '[disabled]': {
        border: 'solid #ccc 1px',
        color: '#666',
        ':empty:before': {
          color: '#ccc',
          opacity: 1
        }
      }
    },
    '>textarea,>select': {
      backgroundColor: '#fff',
      border: 'solid #999 1px',
      color: '#444',
      padding: '5px 10px 5px 10px',
      resize: 'none',
      '[disabled]': {
        border: 'solid #ccc 1px',
        color: '#666'
      }
    },
    '>meter,>progress': {
      backgroundColor: '#fff',
      border: 'solid #999 1px',
      color: '#444',
      '[disabled]': {
        border: 'solid #ccc 1px',
        color: '#666'
      }
    },
    '.group': {
      margin: '0 0 20px 0',
      padding: 0
    },
    '.no-label': {
      margin: 0
    },
    '.w-0-1': {
      display: 'none'
    },
    '.w-1-1': {
      display: 'block',
      width: '100%'
    }
  }
}

for (let h = 1; h <= 5; ++h) {
  jcCss['.jc'][`.h-${h}-1`] = { height: `${65 * h - 20}px` }
}

for (let sw = 2; sw <= 20; ++sw) {
  const item = {}

  item[`.w-0-${sw}`] = { display: 'none' }
  jcCss[`@media(min-width:${200 * sw}px)`] = { '.jc': item }

  for (let s = 1; s <= sw; ++s) {
    item[`.w-${s}-${sw}`] = {
      display: 'block',
      width: `${s / sw * 100}`
        .replace(/(\....).*$/, '$1')
        .replace(/(\..*?)0+$/g, '$1')
        .replace(/\.$/, EMPTY_STRING) + '%'
    }
  }
  for (let h = 1; h <= 5; ++h) {
    item[`.h-${h}-${sw}`] = { height: `${65 * h - 20}px` }
  }
}

export const jcStyle = style(jcCss)
