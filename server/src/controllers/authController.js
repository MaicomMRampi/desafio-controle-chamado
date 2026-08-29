import { AuthLogin } from "../services/authService.js"
import jwt from 'jsonwebtoken'

export async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: 'Email e senha são obrigatórios' })

    const response = await AuthLogin({ email, password })

    if (response.error) {
      return res.status(response.code).json({ message: response.message })
    }

    const jwtToken = jwt.sign(response.user, process.env.JWT_SECRET || 'senha provisoria', { expiresIn: '8h' })

    res.cookie('help_desk_token', jwtToken, {
      httpOnly: true,
      maxAge: 3600000 * 8,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    return res.status(200).json({ message: 'Login realizado com sucesso !' })
  } catch (error) {

    return res.status(500).json({ message: error?.message })
  }
}

export async function checkAuth(req, res) {
  try {
    const dataUser = req.user
    return res.status(200).json(dataUser)
  } catch (error) {

    return res.status(500).json({ message: 'Erro ao consultar autenticação do usuário' })
  }
}