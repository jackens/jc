import { app } from '../js/app.js'
import { ds } from '../js/ds.js'

export default async ade => {
  const queriesSent = []
  const dsTest = ds('SCHeMa', 'TaBLe', ['c1', 'c2', 'c3'])
  const appSendResults = [{
    affectedRows: 1, insertId: 1
  }, {
    affectedRows: 1, insertId: 2
  }, [
    [7, 'one_7', '2', 3], [17, 'one_17', '2', 3], [42, 'one_42', '2', 3]
  ], null, null, {
    affectedRows: 1, insertId: 3
  }]

  let invokeCounter = -1

  app.send = ({ query }) => {
    queriesSent.push(query)
    return appSendResults[++invokeCounter] ?? { affectedRows: 1 }
  }

  const toInsert1 = { c1: 'one', c2: 'two', c3: 42, c4: 'invalid column name' }
  const ok1 = await dsTest.insert(toInsert1)
  ade(toInsert1, { id: 1, c1: 'one', c2: 'two', c3: 42, c4: 'invalid column name' })
  ade(ok1, true)

  const toInsert2 = { id: 17, c1: 42 }
  const ok2 = await dsTest.insert(toInsert2)
  ade(toInsert2, { id: 2, c1: 42 })
  ade(ok2, true)

  const selected = await dsTest.select({ c2: '2', c3: 3, c4: 'invalid column name' })
  ade(selected, {
    7: { id: 7, c1: 'one_7', c2: '2', c3: 3 },
    17: { id: 17, c1: 'one_17', c2: '2', c3: 3 },
    42: { id: 42, c1: 'one_42', c2: '2', c3: 3 }
  })

  const toUpdate1 = toInsert1
  const ok4 = await dsTest.update(toUpdate1, 'c1', 1)
  ade(toUpdate1, { id: 1, c1: 1, c2: 'two', c3: 42, c4: 'invalid column name' })
  ade(ok4, true)

  const toUpdate2 = toInsert2
  const ok5 = await dsTest.update(toUpdate2, 'c4', 'invalid column name')
  ade(ok5, false)
  ade(toUpdate2, { id: 2, c1: 42 })

  const toDelete = selected[42]
  const ok6 = await dsTest.delete(toDelete)
  ade(ok6, true)

  ade(queriesSent, [
    "INSERT INTO `SCHeMa`.`TaBLe`(`c1`,`c2`,`c3`)VALUES('one','two',42)",
    'INSERT INTO `SCHeMa`.`TaBLe`(`id`,`c1`)VALUES(17,42)',
    "SELECT `id`,`c1`,`c2`,`c3` FROM `SCHeMa`.`TaBLe` WHERE `c2`='2' AND `c3`=3",
    'UPDATE `SCHeMa`.`TaBLe` SET `c1`=1 WHERE `id`=1',
    'DELETE FROM `SCHeMa`.`TaBLe` WHERE `id`=42'
  ])
}
