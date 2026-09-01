import { db } from './databaseConnect.js'

const green = '\x1b[32m';

// tabelas
const users =
  `
  create table if not exists usuarios (
      id int generated always as identity primary key,
      nome varchar(150),
      email varchar(150) unique,	
      senha varchar(255),
      perfil varchar(255),
      status boolean default true,
      primeiro_acesso boolean default true,
      inserido_em timestamptz default current_timestamp
  )
`

const priority =
  `
  create table if not exists atendimento_prioridade(
	id int generated always as identity primary key,
	descricao varchar(100) unique
)
`

const priorityValues =
  `
  insert into atendimento_prioridade(descricao) 
  values('BAIXA'), ('MEDIA'), ('ALTA'), ('CRITICA') on conflict(descricao) do nothing

`
const shedulingSql =
  `
create table if not exists agendamento (
  id int generated always as identity primary key,
  titulo varchar(100) not null,
  descricao text not null,
  cliente_id int references usuarios (id) not null,
  tecnico_id int references usuarios(id),
  status varchar(50) not null default 'Aberto',
  prioridade varchar(50) not null,
  ativo boolean default true, 
  data_abertura timestamp default current_timestamp,
  usuario_responsavel_id int references usuarios(id)
  )
`
const messages =
  `
create table agendamento_mensagens (
    id int generated always as identity primary key,
    id_agendamento int not null,
    id_usuario_autor int not null,
    tipo_mensagem varchar(20) not null,
    mensagem text not null,
    inserido_em timestamp default current_timestamp
)


`

export default async function TablesDatabase() {

  let transationStart = false
  let client = null
  const tables = [users, priority, priorityValues, shedulingSql, messages]

  try {
    client = await db.connect()

    // Inicia uma transação
    await client.query('BEGIN')

    transationStart = true

    for (const query of tables) {
      await client.query(query)
    }

    await client.query('COMMIT')

    console.log(`${green}Criação das tabelas executadas com sucesso !`)

    process.exit(0)
  } catch (error) {
    if (transationStart && client) await client.query('ROLLBACK')
    console.log('Erro ao criar tabelas', error?.message)
  } finally {
    if (client) client.end()
  }
}

TablesDatabase()