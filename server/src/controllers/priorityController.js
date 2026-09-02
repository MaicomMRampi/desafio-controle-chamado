import { allPriority, savePriority, deletePriorityId } from "../services/priorityService.js"

export async function getAllPriority(req, res) {
  try {
    const response = await allPriority()

    return res.status(200).json(response)
  } catch (error) {
    console.log(`Erro ao buscar status do atendimento: ${error?.message}`)
    return res.status(500).json({ message: error?.message })
  }
}

export async function newPriority(req, res) {
  try {
    const { description } = req.body
    if (!description) return res.status(400).json({ message: 'Descrição é obrigatória' })

    const response = await savePriority(description)

    return res.status(200).json(response)
  } catch (error) {
    console.log(`Erro ao criar status: ${error?.message}`)

    return res.status(500).json({ message: error?.message })
  }
}

export async function deletePriority(req, res) {
  try {
    const { id } = req.query
    if (!id) return res.status(400).json({ message: 'Id é obrigatório' })

    const response = await deletePriorityId(id)

    return res.status(200).json(response)
  } catch (error) {
    console.log(`Erro ao criar status: ${error?.message}`)

    return res.status(500).json({ message: error?.message })
  }
}

