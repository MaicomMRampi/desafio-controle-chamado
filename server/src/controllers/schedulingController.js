import { saveSchedulingService, getScheduleUserForRole, deleteShedulingId } from '../services/schedulingService.js'

export async function saveScheduling(req, res) {
  try {
    const idUser = req.user.id
    for (const [field, value] of Object.entries(req.body)) {
      if (field === 'id') continue
      const isEmpty = value === null || value === ''
      if (isEmpty) {
        return res.status(400).json({ message: `Todos os campos são obrigatórios` })
      }
    }
    const response = await saveSchedulingService({ values: req.body, idUser })
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
    return res.status(200).json(response)
  } catch (error) {
    console.log(`Erro ao excluir agendamentos: ${error?.message}`)
    return res.status(200).json({ message: `Erro ao excluir agendamentos: ${error?.message}` })
  }
}