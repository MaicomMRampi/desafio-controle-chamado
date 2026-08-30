import { allUsers, deleteUserId, newUserSyst, updateUser, getAllTechnician } from "../services/userService.js";

export async function getAllUsers(req, res) {
  try {
    const result = await allUsers()

    return res.status(200).json(result)
  } catch (error) {
    console.log(`Erro ao buscar usuarios:${error?.message}`)
    return res.status(500).json({ message: `Erro ao buscar usuarios: ${error?.message}` })
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.query.id
    if (!id) return res.status(400).json({ message: 'Id do usuário é obrigatório' })
    const response = await deleteUserId(id)

    if (response.error) {

      return res.status(response.code).json({ message: response.message })
    }

    return res.status(200).json({ message: 'Usuário excluido com sucesso!' })
  } catch (error) {
    console.log(`Erro exluir usuario: ${error?.message}`)

    return res.status(500).json({ message: `Erro ao excluir usuario` })
  }
}

export async function userUpdate(req, res) {
  try {
    const { name, id, email, role } = req.body
    if (!name || !id || !email || !role) return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    const response = await updateUser(req.body)
    return res.status(200).json({ message: 'Usuário atualizado com sucesso !' })
  } catch (error) {
    console.log(`Erro ao atualizar usuario: ${error?.message}`)
    return res.status(500).json({ message: `Erro ao atualiar usuário :${error?.message}` })
  }
}

export async function newUser(req, res) {
  try {
    const { name, email, role, password } = req.body
    if (!name || !password || !email || !role) return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    const response = await newUserSyst(req.body)
    return res.status(200).json({ message: 'Usuário criado com sucesso !' })
  } catch (error) {
    console.log(`Erro ao criar usuario: ${error?.message}`)

    return res.status(500).json({ message: `Erro ao criar usuário :${error?.message}` })
  }
}
export async function getTechnician(req, res) {
  try {
    const response = await getAllTechnician(req.body)
    return res.status(200).json(response)
  } catch (error) {
    console.log(`Erro ao buscar técnicos': ${error?.message}`)

    return res.status(500).json({ message: `Erro ao buscar técnicos :${error?.message}` })
  }
}