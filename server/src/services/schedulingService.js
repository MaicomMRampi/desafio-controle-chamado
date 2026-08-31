import { db } from "../config/databaseConnect.js"

const sqlInsertScheduling =
  `
  INSERT INTO agendamento 
  (titulo, descricao, cliente, tecnico_id, prioridade, usuario_responsavel_id) 
  VALUES ($1, $2, $3, $4, $5, $6)
`
const getScheduling =
  `
  select
  a.id, 
	a.titulo as title, 
	a.descricao as description,
	a.cliente as client,
	a.tecnico_id as technician, 
	u.nome as "tecnicianName",
	a.status, 
	a.data_abertura as "openingDate",
	a.criado_em as "insertedDate",
	a.usuario_responsavel_id as "userResponsive",
  a.prioridade as priority
from
	agendamento a
	left join usuarios u on a.tecnico_id = u.id 
where
a.ativo is true and 
(
	exists (
	select
		1
	from
		usuarios u
	where
		u.id = $1
		and 
	u.perfil = 'administrador'
)
	or 
a.usuario_responsavel_id = $1
)
`

const updateSheduling = `update agendamento set ativo = false, inativado_por = $1, inativado_em = now() where id = $2`

export async function saveSchedulingService(values) {
  try {
    const { title, description, client, technician_id, status, priority, openingDate } = values.values
    const idUser = values.idUser
    await db.query(sqlInsertScheduling, [title, description, client, technician_id, priority, idUser])
  } catch (error) {
    throw new Error(`Erro ao salvar agendamento: ${error?.message}`)
  }
}

export async function getScheduleUserForRole(idUser) {
  try {
    return (await db.query(getScheduling, [idUser])).rows
  } catch (error) {
    throw new Error(`Erro ao buscar agendamentos: ${error?.message}`)
  }
}

export async function deleteShedulingId(values) {
  try {
    const { idUser, id } = values
    const result = await db.query(updateSheduling, [idUser, id])
    return { success: true }
  } catch (error) {
    throw new Error(`Erro ao excluir agendamento: ${error?.message}`)
  }
}