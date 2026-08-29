import { allUsers, deleteUserId, updateUser } from "../services/userService.js";

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

  } catch (error) {

  }
}