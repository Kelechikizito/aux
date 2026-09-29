import Fastify from 'fastify'
import { pool } from './db.js'

const app = Fastify({
  logger: true
})

app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

app.get('/db', async (request, reply) => {
  const { rows } = await pool.query('SELECT now()')
  return { now: rows[0].now }
})


const start = async () => {
  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
