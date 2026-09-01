import jwt from 'jsonwebtoken'
import { db } from '../config/databaseConnect.js'

async function checkActiveUser(id) {
  const sql = `select id from usuarios u where u.id = $1 and u.status is true`
  try {
    return (await db.query(sql, [id])).rowCount
  } catch (error) {
    throw new Error('Erro ao verificar status do usuário')
  }
}

export default async function authJwt(req, res, next) {
  const { help_desk_token } = req.cookies

  if (!help_desk_token) return res.status(401).json({ message: 'Usuário não autenticado' })

  const clearAuthCookie = () => {
    res.clearCookie('help_desk_token', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production'
    })
  }

  try {
    const decoded = jwt.verify(help_desk_token, process.env.JWT_SECRET)

    const idUser = decoded?.id

    if (!idUser) {
      clearAuthCookie()

      return res.status(401).json({ message: 'Token inválido' })
    }
    const isActive = await checkActiveUser(idUser)

    // verifica se o usuário está ativo
    if (!isActive) {
      clearAuthCookie()
      return res.status(401).json({ message: 'Usuário não encontrado ou inativo' })
    }

    req.user = decoded

    return next()
  } catch (error) {

    clearAuthCookie()

    if (error.name === 'TokenExpiredError') {

      return res.status(401).json({ message: 'Token expirado' })
    }

    return res.status(401).json({ message: 'Token inválido' })
  }
}