import { db } from "../config/databaseConnect.js";

const sqlGetAllUsers = `select u.nome as name,  u.id, u.email, u.status, u.perfil as role, u.primeiro_acesso as "firstLogin"  from usuarios u`
const sqlDeleteUser = `delete from usuarios where id = $1 `

export async function allUsers() {
  try {
    return (await db.query(sqlGetAllUsers)).rows
  } catch (error) {
    throw new Error(`${error?.message || 'Erro ao buscar usuários'}`)
  }
}

export async function deleteUserId(id) {
  try {
    const deleteResponse = await db.query(sqlDeleteUser, [id])

    if (deleteResponse.rowCount === 0) {
      return {
        error: true,
        code: 400,
        message: 'Usuário não encontrado para exlusão'
      }
    }

    return { error: false }
  } catch (error) {
    throw new Error(`${error?.message || 'Erro ao buscar usuários'}`)
  }
}

export async function updateUser(values) {
  try {

  } catch (error) {

  }
}