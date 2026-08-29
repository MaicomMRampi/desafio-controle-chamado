import { db } from "../config/databaseConnect.js"

const sql = `select ap.id, upper(ap.descricao) as description from atendimento_prioridade ap order by 2`
const sqlNewPriority = `insert into atendimento_prioridade (descricao) values($1)`
const sqlDelete = `delete from atendimento_prioridade where id = $1`

export async function allPriority() {
  try {
    return (await db.query(sql)).rows
  }
  catch (error) {
    throw new Error(`Erro ao buscar status do atendimento: ${error?.message}`)
  }
}

export async function savePriority(description) {
  try {
    await db.query(sqlNewPriority, [description.toUpperCase().trim()])
    return { message: 'success' }
  } catch (error) {

    if (error.code === '23505') {
      throw new Error('Status informado já inserido no sistema')
    }
    throw new Error(`Erro ao adicionar status: ${error?.message}`)
  }
}

export async function deletePriorityId(id) {
  try {
    await db.query(sqlDelete, [id])
    return { message: 'success' }
  } catch (error) {
    throw new Error(`Erro ao exluir status: ${error?.message}`)
  }
}