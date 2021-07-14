import { jsOnParse } from '../js/js-on-parse.js'

export default ade => {
  const handlers = {
    join: (...params) => params.join(' '),
    outer: text => `Hello ${text}!`,
    inner: text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
    question: text => ({ d: 'Yes!', t: 42 }[text[0]])
  }

  ade(jsOnParse(`{
    "join": ["Hello", "World!"]
  }`, handlers), 'Hello World!')

  ade(jsOnParse(`{
    "join": ["Hello", "World!"], "to_much": "whatever"
  }`, handlers), {
    join: ['Hello', 'World!'], to_much: 'whatever'
  })

  ade(jsOnParse(`{
    "outer":{ "inner": "wORld" }
  }`, handlers), 'Hello World!')

  ade(jsOnParse(`[{
    "question": "does it really works?!?"
  }, {
    "question": "the answer to life the universe and everything"
  }, {
    "Question": null
  }]`, handlers), ['Yes!', 42, { Question: null }])

  ade(jsOnParse('{"H":{"e":{"l":{"l":{"o":["World!"]}}}}}', handlers), {
    H: { e: { l: { l: { o: ['World!'] } } } }
  })
}
