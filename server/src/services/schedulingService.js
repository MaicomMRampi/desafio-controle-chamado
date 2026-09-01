import { db } from "../config/databaseConnect.js"
import ErroResponse from "../utils/returnErro.js"

const sqlInsertScheduling =
  `
  INSERT INTO agendamento 
  (titulo, descricao, cliente_id, tecnico_id, prioridade, usuario_responsavel_id) 
  VALUES ($1, $2, $3, $4, $5, $6)
`
const getScheduling =
  `
    with usuario_table as (
    select 
    u.id,
    u.nome,
    u.perfil 
    from usuarios u
  )
    
  select
    a.id, 
    a.titulo as title, 
    a.descricao as description,
    --
    uu.nome as client,
    uu.id as "clientId", 
    a.tecnico_id as technician, 
    a.tecnico_id as technician_id,
    ---
    u.nome as "tecnicianName",
    a.status, 
    a.data_abertura as "openingDate",
    a.usuario_responsavel_id as "userResponsive",
    a.prioridade as priority
  from
    agendamento a
    left join usuario_table u on a.tecnico_id = u.id 	
    left join usuario_table uu on a.cliente_id = uu.id	
  where
  a.ativo is true and (
    exists (
      select 1 
      from usuarios u_admin 
      where u_admin.id = $1 and u_admin.perfil = 'administrador'
    )
    or a.usuario_responsavel_id = $1
    or a.tecnico_id = $1
    or a.cliente_id = $1
  )
  order by id desc
`

const inactiveScheduling = `update agendamento set ativo = false where id = $1`
const updateScheduling = `update agendamento set status = $1, tecnico_id = $2, prioridade = $3 where id = $4`

const updateStatus = `update agendamento set status = $1 where id = $2`
const updatePriority = `update agendamento set prioridade = $1 where id = $2`
const sqlMessage = `
INSERT INTO agendamento_mensagens (id_agendamento, id_usuario_autor, tipo_mensagem, mensagem)
VALUES ($1, $2, $3, $4)
`
const getMessages =
  `
  SELECT 
      am.id,
      am.id_agendamento as "schedulingId",
      am.id_usuario_autor as "authorId",
      am.tipo_mensagem as "messageType",
      am.mensagem as "message",
      am.inserido_em as "insertedAt",
      u.nome AS authorName,
      u.perfil AS role
  FROM agendamento_mensagens am
  LEFT JOIN usuarios u ON am.id_usuario_autor = u.id
  WHERE am.id_agendamento = $2
    AND (

        EXISTS (
            SELECT 1 
            FROM usuarios u_admin 
            WHERE u_admin.id = $1 AND u_admin.perfil = 'administrador'
        )
        OR am.id_usuario_autor = $1      
        OR am.tipo_mensagem = 'publica'
    )
  ORDER BY am.inserido_em ASC
`

export async function saveSchedulingService(values) {
  try {
    const { title, description, idClient, priority, idUser, technician_id = null } = values

    await db.query(sqlInsertScheduling, [title, description, idClient, technician_id, priority, idUser])

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
    const result = await db.query(inactiveScheduling, [id])
    return { success: true }
  } catch (error) {
    throw new Error(`Erro ao excluir agendamento: ${error?.message}`)
  }
}

export async function updateSchedulingId(values) {
  try {
    const { id, status, technician_id = null, priority } = values
    const result = await db.query(updateScheduling, [status, technician_id, priority, id])
    if (result.rowCount === 0) return ErroResponse(400, 'Agendamento não encontrado', true)
    return { code: 200, message: 'Agendamento atualizado com sucesso!', error: false }
  } catch (error) {
    console.log(`Erro ao atualizar agendamento ${error?.message}`)
    throw new Error(`Erro ao atualizar agendamento: ${error?.message}`)
  }
}

export async function updateSituationService(values) {
  try {
    const { value, type, id } = values
    let sql = null
    if (type === 'priority') sql = updatePriority
    if (type === 'status') sql = updateStatus
    const result = await db.query(sql, [value, id])
    return { code: 200, message: 'Agendamento atualizado com sucesso!', error: false }
  } catch (error) {
    console.log(`Erro ao atualizar agendamento ${error?.message}`)
    throw new Error(`Erro ao atualizar agendamento: ${error?.message}`)
  }
}

export async function saveNoteService(values) {
  try {
    const { id, idUser, type, message } = values

    const result = await db.query(sqlMessage, [id, idUser, type, message])
    return { code: 200, message: `Mensagem ${type === 'publica' ? 'enviada' : 'salva'} com sucesso!`, error: false }
  } catch (error) {
    console.log(`Erro ao salvar/enviar mensagem ${error?.message} `)
    throw new Error(`Erro ao salvar/enviar mensagem: ${error?.message} `)
  }
}

export async function getMessagesService(values) {
  try {
    const { id, idUser } = values

    const result = await db.query(getMessages, [idUser, id])
    return result.rows
  } catch (error) {
    console.log(`Erro ao salvar/enviar mensagem ${error?.message} `)
    throw new Error(`Erro ao salvar/enviar mensagem: ${error?.message} `)
  }
}
