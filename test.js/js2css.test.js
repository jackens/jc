import { js2css } from '../js/js2css.js'

export default ade => {
  ade(js2css({
    '@font-face$1': {
      fontFamily: 'Jackens',
      src$1: 'url(fonts/Jackens.otf)',
      src$2: "url(fonts/Jackens.otf) format('opentype')," +
        "url(fonts/Jackens.svg) format('svg')",
      fontWeight: 'normal',
      fontStyle: 'normal'
    },
    '@font-face$2': {
      fontFamily: 'C64',
      src: 'url(fonts/C64_Pro_Mono-STYLE.woff)'
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    },
    div: {
      border: 'solid red 1px',
      '.c1': { 'background-color': '#000' },
      ' .c1': { backgroundColor: 'black' },
      '.c2': { backgroundColor: 'rgb(0,0,0)' }
    },
    '@media(min-width:200px)': {
      div: { margin: 0, padding: 0 },
      span: { color: '#000' }
    }
  }), '@font-face{font-family:Jackens;src:url(fonts/Jackens.otf);' +
  "src:url(fonts/Jackens.otf) format('opentype')," +
  "url(fonts/Jackens.svg) format('svg');" +
  'font-weight:normal;font-style:normal}' +
  '@font-face{font-family:C64;src:url(fonts/C64_Pro_Mono-STYLE.woff)}' +
  '@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}' +
  'div{border:solid red 1px}' +
  'div.c1{background-color:#000}' +
  'div .c1{background-color:black}' +
  'div.c2{background-color:rgb(0,0,0)}' +
  '@media(min-width:200px){div{margin:0;padding:0}span{color:#000}}')

  ade(js2css({
    a: {
      color: 'red', margin: 1, '.c': { margin: 2, padding: 2 }, padding: 1
    }
  }), 'a{color:red;margin:1}a.c{margin:2;padding:2}a{padding:1}')

  ade(js2css({
    a: {
      '.b': {
        color: 'red', margin: 1, '.c': { margin: 2, padding: 2 }, padding: 1
      }
    }
  }), 'a.b{color:red;margin:1}a.b.c{margin:2;padding:2}a.b{padding:1}')
}
