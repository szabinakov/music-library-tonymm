const db = require('../src/db')

afterEach(async () => {
  await db.query('TRUNCATE Artists CASCADE')
  await db.query('TRUNCATE Album CASCADE')
})