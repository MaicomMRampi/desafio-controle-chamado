import { saveSchedulingService } from '../services/schedulingService.js'

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