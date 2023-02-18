const db = required('../arc/db')

afterEach(async () => {
  await db.query('TRUNCATE Artists CASCADE')
})