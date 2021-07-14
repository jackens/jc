/**
 * Styles for blogging platform based on Markdown and $\KaTeX$.
 */

import { style } from '../js/style.js'

export const mdtpStyle = style({
  '@page': {
    size: 'a4 portrait',
    margin: '20mm'
  },
  '@font-face$r': {
    fontFamily: "'LM Roman 10'",
    src: 'url(/fonts/lmroman10-regular.otf)'
  },
  '@font-face$b': {
    fontFamily: "'LM Roman 10'",
    fontWeight: 'bold',
    src: 'url(/fonts/lmroman10-bold.otf)'
  },
  '@font-face$i': {
    fontFamily: "'LM Roman 10'",
    fontStyle: 'italic',
    src: 'url(/fonts/lmroman10-italic.otf)'
  },
  '@font-face$bi': {
    fontFamily: "'LM Roman 10'",
    fontWeight: 'bold',
    fontStyle: 'italic',
    src: 'url(/fonts/lmroman10-bolditalic.otf)'
  },
  '@font-face$sr': {
    fontFamily: "'LM Sans 10'",
    src: 'url(/fonts/lmsans10-regular.otf)'
  },
  '@font-face$sb': {
    fontFamily: "'LM Sans 10'",
    fontWeight: 'bold',
    src: 'url(/fonts/lmsans10-bold.otf)'
  },
  '@font-face$si': {
    fontFamily: "'LM Sans 10'",
    fontStyle: 'italic',
    src: 'url(/fonts/lmsans10-oblique.otf)'
  },
  '@font-face$sbi': {
    fontFamily: "'LM Sans 10'",
    fontWeight: 'bold',
    fontStyle: 'italic',
    src: 'url(/fonts/lmsans10-boldoblique.otf)'
  },
  '@font-face$mr': {
    fontFamily: "'LM Mono 10'",
    src: 'url(/fonts/lmmonolt10-regular.otf)'
  },
  '@font-face$mb': {
    fontFamily: "'LM Mono 10'",
    fontWeight: 'bold',
    src: 'url(/fonts/lmmonolt10-bold.otf)'
  },
  '@font-face$mi': {
    fontFamily: "'LM Mono 10'",
    fontStyle: 'italic',
    src: 'url(/fonts/lmmonolt10-oblique.otf)'
  },
  '@font-face$mbi': {
    fontFamily: "'LM Mono 10'",
    fontWeight: 'bold',
    fontStyle: 'italic',
    src: 'url(/fonts/lmmonolt10-boldoblique.otf)'
  },
  '@font-face$ar': {
    fontFamily: 'AntPolt',
    src: 'url(/fonts/antpolt-regular.otf)'
  },
  '@font-face$ab': {
    fontFamily: 'AntPolt',
    fontWeight: 'bold',
    src: 'url(/fonts/antpolt-bold.otf)'
  },
  '@font-face$ai': {
    fontFamily: 'AntPolt',
    fontStyle: 'italic',
    src: 'url(/fonts/antpolt-italic.otf)'
  },
  '@font-face$abi': {
    fontFamily: 'AntPolt',
    fontWeight: 'bold',
    fontStyle: 'italic',
    src: 'url(/fonts/antpolt-bolditalic.otf)'
  },
  '@font-face$j': {
    fontFamily: 'Jackens',
    fontStyle: 'normal',
    fontWeight: 'normal',
    src$1: 'url(/otf/Jackens.otf)',
    src$2: "url(/otf/Jackens.otf) format('opentype'),url(/svg/Jackens.svg) format('svg')"
  },
  html: {
    fontFamily: "'LM Roman 10','Times New Roman',Times,serif",
    margin: 0
  },
  body: {
    fontFamily: "'LM Roman 10','Times New Roman',Times,serif",
    margin: '0 auto 0 auto',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '1.125em',
    lineHeight: '3ex',
    maxWidth: '210mm',
    padding: '10px',
    '>h1': {
      marginTop: '1.5ex'
    }
  },
  a: {
    color: ' #14b',
    textDecoration: 'none'
  },
  h1: {
    fontFamily: "'LM Sans 10',Arial,Helvetica,sans-serif",
    fontSize: '3em',
    lineHeight: '3ex',
    margin: '3ex auto 1.5ex auto',
    pageBreakAfter: 'avoid',
    pageBreakInside: 'avoid',
    '+h2': {
      marginTop: 0
    },
    '+p': {
      marginTop: 0
    },
    '::after': {
      content: "''",
      display: 'block',
      height: '10ex',
      marginBottom: '-10ex'
    },
    '~*': {
      ' img': {
        boxShadow: '0 0 5px rgba(0,0,0,0.3)'
      }
    }
  },
  h2: {
    fontFamily: "'LM Sans 10',Arial,Helvetica,sans-serif",
    fontSize: '2em',
    lineHeight: '3ex',
    margin: '3ex auto 1.5ex auto',
    pageBreakAfter: 'avoid',
    pageBreakInside: 'avoid',
    '+h3': {
      marginTop: 0
    },
    '+p': {
      marginTop: 0
    },
    '::after': {
      content: "''",
      display: 'block',
      height: '10ex',
      marginBottom: '-10ex'
    }
  },
  h3: {
    fontFamily: "'LM Sans 10',Arial,Helvetica,sans-serif",
    fontSize: '1em',
    lineHeight: '3ex',
    margin: '3ex auto 1.5ex auto',
    pageBreakAfter: 'avoid',
    pageBreakInside: 'avoid',
    '+h4': {
      marginTop: 0
    },
    '+p': {
      marginTop: 0
    },
    '::after': {
      content: "''",
      display: 'block',
      height: '10ex',
      marginBottom: '-10ex'
    }
  },
  h4: {
    fontFamily: "'LM Sans 10',Arial,Helvetica,sans-serif",
    fontSize: '1em',
    lineHeight: '3ex',
    margin: '3ex auto 1.5ex auto',
    pageBreakAfter: 'avoid',
    pageBreakInside: 'avoid',
    '+h5': {
      marginTop: 0
    },
    '+p': {
      marginTop: 0
    },
    '::after': {
      content: "''",
      display: 'block',
      height: '10ex',
      marginBottom: '-10ex'
    }
  },
  h5: {
    fontFamily: "'LM Sans 10',Arial,Helvetica,sans-serif",
    fontSize: '1em',
    lineHeight: '3ex',
    margin: '3ex auto 1.5ex auto',
    pageBreakAfter: 'avoid',
    pageBreakInside: 'avoid',
    '+p': {
      marginTop: 0
    },
    '::after': {
      content: "''",
      display: 'block',
      height: '10ex',
      marginBottom: '-10ex'
    }
  },
  h6: {
    fontFamily: "'LM Sans 10',Arial,Helvetica,sans-serif",
    fontSize: '1em',
    lineHeight: '3ex',
    margin: '3ex auto 1.5ex auto',
    pageBreakAfter: 'avoid',
    pageBreakInside: 'avoid',
    '::after': {
      content: "''",
      display: 'block',
      height: '10ex',
      marginBottom: '-10ex'
    }
  },
  p: {
    textAlign: 'justify'
  },
  ol: {
    textAlign: 'justify',
    listStyle: 'outside decimal',
    marginLeft: 0,
    paddingLeft: '1.6em',
    '>li': {
      ':before': {
        display: 'inline-block',
        position: 'absolute',
        textIndent: '-1.6em'
      },
      position: 'relative',
      textAlign: 'justify'
    },
    ':last-child': {
      marginBottom: '12px'
    }
  },
  ul: {
    textAlign: 'justify',
    listStyle: 'none',
    marginLeft: 0,
    paddingLeft: '1.6em',
    '>li': {
      ':before': {
        content: "'\\2014'",
        display: 'inline-block',
        position: 'absolute',
        textIndent: '-1.6em'
      },
      position: 'relative',
      textAlign: 'justify'
    },
    ':last-child': {
      marginBottom: '12px'
    }
  },
  li: {
    '>p': {
      display: 'inline-block',
      margin: 0,
      verticalAlign: 'text-top'
    },
    '>ol': {
      marginTop: '12px!important',
      paddingLeft: '1.5em'
    },
    '>ul': {
      marginTop: '12px!important',
      paddingLeft: '1.5em'
    }
  },
  pre: {
    borderRadius: '3px',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    fontFamily: "'LM Mono 10','Courier New',Courier,monospace",
    marginBottom: '0.5em',
    marginTop: '0.5em',
    padding: '1em',
    position: 'relative',
    whiteSpace$m: '-moz-pre-wrap',
    whiteSpace$o: '-o-pre-wrap',
    whiteSpace$: '-pre-wrap',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    ' .jc': {
      position: 'absolute',
      right: '10px',
      top: '-10px',
      width: '45px'
    }
  },
  code: {
    fontFamily: "'LM Mono 10','Courier New',Courier,monospace"
  },
  blockquote: {
    backgroundColor: '#eee',
    borderRadius: '3px',
    boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    margin: '0.5em 0 0.5em 0',
    marginInlineEnd: 0,
    marginInlineStart: 0,
    padding: '1em',
    ' :first-child': {
      marginBlockStart: 0,
      marginTop: 0
    },
    ' :last-child': {
      marginBlockEnd: 0,
      marginBottom: 0
    }
  },
  summary: {
    cursor: 'pointer'
  },
  table: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '24px',
    borderBottom: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    borderSpacing: 0,
    ' th': {
      padding: '3px 10px',
      backgroundColor: '#eee',
      borderTop: '1px solid #ddd',
      borderLeft: '1px solid #ddd'
    },
    ' td': {
      padding: '3px 10px',
      borderTop: '1px solid #ddd',
      borderLeft: '1px solid #ddd',
      ' hr': {
        border: 'none',
        borderTop: '1px solid #ddd!important',
        margin: '5px 0 5px 0'
      }
    },
    ' tr': {
      ':nth-child(even)': {
        backgroundColor: '#eee'
      }
    }
  },
  img: {
    border: 'none',
    display: 'block',
    margin: '0 auto 0 auto',
    maxWidth: '100%'
  },
  hr: {
    border: 'none',
    borderTop: '1px solid black',
    margin: '1em auto 1em auto'
  },
  'span.nbsp': {
    whiteSpace: 'nowrap'
  },
  '.katex': {
    fontSize: '1em'
  }
})
