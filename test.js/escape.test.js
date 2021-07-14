import { escape } from '../js/escape.js'

export default ade => {
  ade(escape.query`
  select *
  from tab
  where
    col = ${42} or
    col = ${"'"} or
    col = ${true} or
    col = ${false} or
    col = ${new Date('1980-03-31T04:30:00.000Z')} or
    col in (${[42, "'", true, false, new Date('1980-03-31T04:30:00.000Z')]})
`, `
  select *
  from tab
  where
    col = 42 or
    col = '''' or
    col = b'1' or
    col = b'0' or
    col = '1980-03-31 04:30:00' or
    col in (42,'''',b'1',b'0','1980-03-31 04:30:00')
`)
}
