import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const { Pool } = pg

export const db = new Pool({
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT

})

db.connect((err) => {
  if (err) {
    console.log('Erro ao conectar ao banco de dados', err)
  } else {
    console.log('Connectado ao banco de dados com sucesso')
  }
})