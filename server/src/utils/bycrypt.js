import bcrypt from "bcrypt";

export async function comparePassword(password, userPassword) {

  return await bcrypt.compare(password, userPassword)
}

export async function gerarHash(password) {

  return bcrypt.hash(password, 10)
}