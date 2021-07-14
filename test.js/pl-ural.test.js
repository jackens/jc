import { plUral } from '../js/pl-ural.js'

export default ade => {
  ade(plUral(0, 'car', 'cars', 'cars'), '0 cars')
  ade(plUral(1, 'car', 'cars', 'cars'), '1 car')
  ade(plUral(5, 'car', 'cars', 'cars'), '5 cars')
  ade(plUral(42, 'car', 'cars', 'cars'), '42 cars')

  ade(plUral(0, 'auto', 'auta', 'aut'), '0 aut')
  ade(plUral(1, 'auto', 'auta', 'aut'), '1 auto')
  ade(plUral(5, 'auto', 'auta', 'aut'), '5 aut')
  ade(plUral(42, 'auto', 'auta', 'aut'), '42 auta')
}
