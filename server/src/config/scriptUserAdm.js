import { db } from './databaseConnect.js'
import { gerarHash } from '../utils/bycrypt.js'

// cores nativas do terminal
const blue = '\x1b[36m';
const yellow = '\x1b[33m';
const green = '\x1b[32m';
const bold = '\x1b[1m';
const space = '\x1b[0m';

export async function NewUserAdm() {
  try {

    const { rowCount } = await db.query(`select id from usuarios where perfil = 'administrador'`)

    const name = `administrador${rowCount}`
    const email = `administrador.empresa${rowCount}@gmail.com`
    const password = `admin${rowCount}`
    const passwordCrypto = await gerarHash(password)

    const sql = `INSERT INTO usuarios
      (nome, email, senha, perfil)
      VALUES($1, $2, $3, $4)
      `
    await db.query(sql, [name, email, passwordCrypto, 'administrador'])

    // Retornando os dados de acesso do usuário
    console.log(
      `
        ${blue}--------------------------------------------------
        ${bold} Dados de acesso do usuário administrador             
        --------------------------------------------------
        ${space}${bold} Nome:${space}  ${yellow}${name}       
        ${space}${bold} Email:${space} ${yellow}${email}
        ${space}${bold} Senha:${space} ${green}${password}
        ${blue}--------------------------------------------------
      `);

    process.exit(0)
  } catch (error) {
    console.log(`Erro ao criar administrador: Contate o desenvolvedor:${error?.message}`)
  } finally {
    await db.end()
  }
}

NewUserAdm()