import { db } from "../config/databaseConnect.js"
import { comparePassword } from "../utils/bycrypt.js"

const sqlUser = `select u.id, u.nome, u.email, u.senha, u.status, u.perfil, u.primeiro_acesso from usuarios u where u.email = $1`
const sqlUserAuth = `select u.id, u.nome, u.email, u.senha, u.status, u.perfil, u.primeiro_acesso from usuarios u where u.id = $1`

function returnCode(error, code, message) {
  return {
    error: error,
    code: code,
    message: message
  }
}

export async function AuthLogin({ password, email }) {
  try {
    const user = await db.query(sqlUser, [email])

    if (user.rowCount === 0) return returnCode(true, 401, 'E-mail ou senha inválidos')
    if (user?.rows[0].status === false) return returnCode(true, 401, 'Usuário inativo, contate o administrador do sistema')

    const userPassword = user.rows[0].senha

    const compare = await comparePassword(password, userPassword)

    if (!compare) return returnCode(true, 401, 'E-mail ou senha inválidos')

    return {
      error: false,
      code: 200,
      message: 'Login realizado com sucesso',
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        name: user.rows[0].nome,
        role: user.rows[0].perfil,
        firstLogin: user.rows[0].primeiro_acesso
      }
    }
  }
  catch (error) {
    throw new Error(`Erro ao verificar credenciais do usuário: ${error?.message}`)
  }
}

export async function checkAuhId(id) {
  try {
    const user = await db.query(sqlUserAuth, [id])
    return {
      id: user.rows[0].id,
      email: user.rows[0].email,
      name: user.rows[0].nome,
      role: user.rows[0].perfil,
      firstLogin: user.rows[0].primeiro_acesso
    }
  } catch (error) {
    console.log(`Erro ao buscar dados do login: ${error?.message}`)
    throw new Error(`Erro ao buscar dados do login ${error?.message}`)
  }
}