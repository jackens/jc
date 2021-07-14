import { ids } from '../js/isd.js'

export default ade => {
  const se1 = ids()
  const se2 = ids()

  const text = 'kóra Poli'

  se1.index('Sample text to index #1', 0)
  se1.index('“Kura” means “hen” in Polish', 1)

  ade(se1.scores(text), { 1: 0.13333333333333333 })
  ade(se1.didYouMean(text), { kóra: 'kura', poli: 'polish' })

  ade(se2.scores(text), {})
  ade(se2.didYouMean(text), {})
}
