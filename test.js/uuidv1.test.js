import { uuidv1 } from '../js/uuidv1.js'

export default ade => {
  const UUID = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/

  for (let i = 0; i < 4200; ++i) {
    const uuid = uuidv1()
    const counter = uuid.split('-')[3]

    if (i === 0) {
      ade(!!uuid.match(UUID), true)
      ade(counter, '8001')
    } else if (i === 4094) {
      ade(counter, '8fff')
    } else if (i === 4095) {
      ade(counter, '8000')
    } else if (i === 4096) {
      ade(counter, '8001')
    }
  }
}
