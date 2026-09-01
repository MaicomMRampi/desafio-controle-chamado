import { saveSchedulingService, getScheduleUserForRole, deleteShedulingId, updateSchedulingId, updateSituationService, saveNoteService, getMessagesService } from '../services/schedulingService.js'

export async function saveScheduling(req, res) {
  try {
    const idUser = req.user.id
    const role = req.user.role

    const { title, description, clientId, priority, technician_id } = req.body

    let idClient = req.user.id

    if (role === 'tecnico') return res.status(400).json({ message: 'Perfis técnicos não tem permissão para inserir agendamento.' })

    if (role === 'administrador') {
      idClient = clientId
    }

    if (!title || !description || !idClient || !priority) return res.status(400).json({ message: 'Todos os campos são obrigatórios' })

    const response = await saveSchedulingService({ title, description, idClient, priority, idUser, technician_id })

    return res.status(200).json({ message: 'Agendamento criado com sucesso !' })
  } catch (error) {
    console.log("🚀 ~ saveScheduling ~ error:", error)
    return res.status(500).json({ message: `Erro ao salvar agendamento: ${error?.message}` })
  }
}

export async function getSchedule(req, res) {
  try {
    const idUser = req.user.id
    const response = await getScheduleUserForRole(idUser)
    return res.status(200).json(response)
  } catch (error) {
    console.log(`Erro ao buscar agendamentos: ${error?.message}`)
    return res.status(200).json({ message: `Erro ao buscar agendamentos: ${error?.message}` })
  }
}

export async function deleteSchedule(req, res) {
  try {
    const idUser = req.user.id
    const id = req.query.id
    if (!id) return res.status(400).json({ message: 'Id para exclusão é necessário' })
    const response = await deleteShedulingId({ idUser, id })
    return res.status(200).json({ message: 'Agendamento Inativado com sucesso !' })
  } catch (error) {
    console.log(`Erro ao excluir agendamentos: ${error?.message}`)
    return res.status(200).json({ message: `Erro ao excluir agendamentos: ${error?.message}` })
  }
}

export async function updateScheduling(req, res) {
  try {
    const { id, status, technician_id, priority } = req.body
    if (!id || !status || !priority) return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    const response = await updateSchedulingId({ id, status, technician_id, priority })
    if (response.error) return res.status(response.code).json({ message: response.message })
    return res.status(response.code).json({ message: response.message })
  } catch (error) {
    console.log(`Erro ao atualizar agendamento: ${error?.message}`)
    return res.status(500).json({ message: `Erro ao atualizar agendamento: ${error?.message}` })
  }
}

export async function updateSituation(req, res) {
  try {
    const { value, type, id } = req.body
    if (!value || !type || !id) return res.status(400).json({ message: 'Erro ao realizar ação, tipo e valor são obrigatórios' })
    const response = await updateSituationService({ value, type, id })
    return res.status(response.code).json({ message: response.message })
  } catch (error) {
    console.log(`Erro ao atualizar agendamento: ${error?.message}`)
    return res.status(500).json({ message: `Erro ao atualizar agendamento: ${error?.message}` })
  }
}

export async function saveNote(req, res) {
  try {
    const { id, technician_id, clientId } = req.body.data
    const { type, message } = req.body
    const idUser = req.user.id
    if (!id || !idUser || !type || !message) return res.status(400).json({ message: 'Erro ao inserir, valores faltantes para concluir a operação' })

    const response = await saveNoteService({ id, idUser, type, message })

    return res.status(response.code).json({ message: response.message })
  } catch (error) {
    console.log(`Erro ao atualizar agendamento: ${error?.message}`)
    return res.status(500).json({ message: `Erro ao atualizar agendamento: ${error?.message}` })
  }
}

export async function getMessages(req, res) {
  try {
    const id = req.query.id
    const idUser = req.user.id
    if (!id) return res.status(400).json({ message: 'O id é obrigaório' })
    const response = await getMessagesService({ id, idUser })
    return res.status(200).json(response)
  } catch (error) {
    console.log(`Erro ao atualizar agendamento: ${error?.message}`)
    return res.status(500).json({ message: `Erro ao atualizar agendamento: ${error?.message}` })
  }
}