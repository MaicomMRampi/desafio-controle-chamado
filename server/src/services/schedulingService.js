import { db } from "../config/databaseConnect.js"

const sqlInsertScheduling =
  `
  INSERT INTO agendamento 
  (titulo, descricao, cliente, tecnico_id, status, prioridade, data_abertura,usuario_responsavel_id) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
`


export async function saveSchedulingService(values) {
  try {
    const { title, description, client, technician_id, status, priority, openingDate } = values.values
    const idUser = values.idUser
    await db.query(sqlInsertScheduling, [title, description, client, technician_id, status, priority, openingDate, idUser])
  } catch (error) {
    throw new Error(`Erro ao salvar agendamento: ${error?.message}`)
  }
}