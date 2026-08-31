import { db } from "../config/databaseConnect.js";
import { comparePassword, gerarHash } from "../utils/bycrypt.js";
import ErroResponse from "../utils/returnErro.js";

const sqlGetAllUsers = `select u.nome as name,  u.id, u.email, u.status, u.perfil as role, u.primeiro_acesso as "firstLogin"  from usuarios u`
const sqlDeleteUser = `delete from usuarios where id = $1 `
const sqlUpdateUser = `update usuarios u set nome = $1, email = $2, perfil = $3 where id = $4`
const sqlInserUser = `insert into usuarios (nome, email, senha, perfil) values ($1, $2, $3, $4)`
const sqlTechnician = `select u.id, u.nome from usuarios u where u.perfil = 'tecnico' order by u.perfil asc`
const sqlUserPassword = `select senha from usuarios u where u.id = $1`
const sqlUpdate = `update usuarios set nome = $1, email = $2, senha = $3, primeiro_acesso = $4 where id = $5`
const sqlUpdateNotPassword = `update usuarios set nome = $1, email = $2 where id = $3`

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
    const { name, id, email, role } = values
    await db.query(sqlUpdateUser, [name, email, role, id])
    return { message: 'sucess' }
  } catch (error) {
    if (error.code === '23505') {

      throw new Error(`Email informado já em uso `)
    }
    throw new Error(`Erro ao atualizar o usuário: ${error?.message}`)
  }
}

export async function newUserSyst(values) {
  try {
    const { name, id, email, role, password } = values
    const passwordHash = await gerarHash(password)
    await db.query(sqlInserUser, [name, email, passwordHash, role])
    return { message: 'sucess' }
  } catch (error) {
    if (error.code === '23505') {

      throw new Error(`Email informado já em uso `)
    }
    throw new Error(`Erro ao criar o usuário: ${error?.message}`)
  }
}

export async function getAllTechnician() {
  try {
    return (await db.query(sqlTechnician)).rows
  } catch (error) {
    throw new Error(`Erro ao buscar técnicos: ${error?.message}`)
  }
}

export async function updateProfileService(values) {
  let client = null
  let transactionStart = null
  try {

    client = await db.connect()
    await client.query('BEGIN')
    transactionStart = true

    const { id, email, name, oldPassword, newPassword, newConfirmPassword } = values

    if (newPassword && newPassword !== newConfirmPassword) {

      return ErroResponse(400, 'As senhas não coincidem')
    }

    if (oldPassword) {
      const password = await client.query(sqlUserPassword, [id])

      if (password.rowCount === 0) return ErroResponse(400, 'Dados não encontrados', true)

      const passwordUser = password?.rows[0]?.senha

      const compareSenha = await comparePassword(oldPassword, passwordUser)

      if (!compareSenha) return ErroResponse(400, 'A Senha atual não confere', true)

      const passCripto = await gerarHash(newPassword)

      await client.query(sqlUpdate, [name, email, passCripto, false, id])

      await client.query('COMMIT')
      return ErroResponse(200, 'Dados atualizados com sucesso', false)
    }

    await client.query(sqlUpdateNotPassword, [name, email, id])

    await client.query('COMMIT')

    return ErroResponse(200, 'Dados atualizados com sucesso', false)

  } catch (error) {
    if (transactionStart) await client.query('ROLLBACK')
    throw new Error(`Erro ao atualizar dados: ${error?.message}`)
  } finally {
    if (client) client.release()
  }
}