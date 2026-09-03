# Help Desk

O **Help Desk** é um sistema para controle de chamados de suporte técnico.

A ideia do projeto é centralizar as solicitações em um único lugar, permitindo que o cliente abra um chamado, o técnico consiga visualizar e atender a solicitação e o administrador tenha controle sobre usuários, chamados e informações do sistema. Além disso, o sistema possui um chat interno de troca de mensagens entre técnico > cliente > administrador.

O projeto foi desenvolvido pensando principalmente em **organização, controle de acesso e facilidade de uso**.

## Tecnologias utilizadas

### Front-end

* **Next.js** — estrutura principal da aplicação
* **React** — construção dos componentes
* **TypeScript** — tipagem do projeto
* **HeroUI** — componentes da interface
* **Tailwind CSS** — estilização
* **Lucide React** — ícones
* **Axios** — comunicação com a API
* **React Hook Form** — formulários
* **DaisyUi** — layoult de chat
* **dayJs** — para manipulação de datas

### Back-end

* **Node.js**
* **Express**
* **PostgreSQL**
* **JWT**
* **Cookies HTTP-Only**
- **Node.js:** ES Modules (`type: module`)

---

## Funcionalidades

### Login e autenticação

A autenticação foi feita utilizando **JWT**, mas o token não fica salvo no `localStorage`.

Ele é armazenado em um **Cookie HTTP-Only**, com configuração de `SameSite`, deixando a sessão mais protegida contra acesso direto pelo JavaScript do navegador.

O sistema também possui validação das rotas para evitar que um usuário acesse páginas que não deveria.

---

### Controle de acesso

Cada usuário possui um perfil, e as funcionalidades disponíveis mudam de acordo com esse perfil.

Atualmente existem três perfis:

**Administrador**

* Cadastro de usuários
* Gerenciamento dos chamados
* Acesso às métricas
* Controle geral do sistema
* Troca de Mensagens (visulização de todas, independente do técnico)

**Técnico**

* Visualização dos chamados
* Atendimento
* Atualização dos chamados
* Interação com o cliente

**Cliente**

* Abertura de chamados
* Visualização dos próprios chamados
* Acompanhamento das solicitações
* Responstas ao técnico

---

### Primeiro acesso

Quando um usuário entra pela primeira vez no sistema, é identificado que ele ainda não alterou sua senha.

Nesse caso, a alteração da senha é obrigatória antes de continuar utilizando o sistema.

---

### Chamados

O principal objetivo do sistema é o gerenciamento dos chamados.

É possível:

* Criar chamados
* Definir prioridade
* Alterar status
* Atribuir chamados
* Visualizar os detalhes
* Acompanhar o atendimento
* Trocar informações com o cliente

Os detalhes de cada chamado são exibidos através de um **Drawer lateral**, evitando a necessidade de sair da tela atual para consultar uma solicitação.

---

### Filtros

A lista de chamados possui alguns filtros para facilitar a localização das solicitações:

* Pesquisa por texto
* Data
* Prioridade
* Status

Também existe um tratamento dos dados retornados pela API para evitar registros duplicados durante a aplicação dos filtros.

---

### Dashboard

O sistema possui um dashboard na tela central possibilitando checar algumas informações.

Algumas das informações apresentadas são:

* Total de chamados
* Chamados abertos
* Chamados em atendimento
* Chamados finalizados
* Chamados vencidos

---

# Instalação

## Pré-requisitos

Para rodar o projeto, você vai precisar ter instalado:

* **Node.js 18 ou superior**
* **PostgreSQL**
* **Git**
* **VS Code** ou outro editor
* **npm**, **yarn** ou **pnpm**

---

## 1. Clonando o projeto

Primeiro, clone o repositório:

```bash
git clone https://github.com/MaicomMRampi/desafio-controle-chamado.git
```

Depois entre na pasta:

```bash
cd desafio-controle-chamado
```

---

# Banco de dados

## 2. Criando o banco

No PostgreSQL, crie o banco que será utilizado pelo sistema:

```sql
CREATE DATABASE helpdesk_db;
```

Não é necessário criar as tabelas manualmente. O próprio projeto possui um script para isso.

---

# Back-end

## 3. Configurando o servidor

Entre na pasta do servidor:

```bash
cd server
```

Instale as dependências:

```bash
npm install
```

Depois crie um arquivo `.env` dentro da pasta `server`.

Exemplo:

```env
# porta para startar a aplicação do back end
PORT=5000
# ------ banco de dados --------
DB_USERNAME=postgres
DB_DATABASE=helpdesk_db
DB_PASSWORD= sua senha do banco de dados
DB_HOST=localhost
DB_PORT=5432
# ------------------------------
JWT_SECRET=fdbd8e75a67f29f701a4e040385e2e23986303ea10239211af907fcbb83578b3e417cb71ce646efd0819dd8c088de1bd
NODE_ENV=development

# porta para validar o cors
API_URL_FRONTEND=http://localhost:3000

```

Altere os valores de acordo com a configuração do seu PostgreSQL.

---

## 4. Criando as tabelas

Com o `.env` configurado, execute:

```bash
npm run tables_creator
```

Esse comando cria as tabelas necessárias para o sistema funcionar e também executa as configurações iniciais do banco.

---

## 5. Criando o administrador

Agora precisamos criar o primeiro usuário do sistema.

Execute:

```bash
npm run admin_creator
```

O comando vai criar um usuário administrador e mostrar as credenciais diretamente no terminal.

Exemplo:

![Credenciais do administrador](https://github.com/user-attachments/assets/e6535977-eb7c-42cc-850e-6ab74a9d8128)

> Guarde essas informações. Esse será o usuário utilizado para fazer o primeiro acesso ao sistema.
> Caso perca esse acesso, basta rodar o script novamente que o sistema retornara um novo administrador

Depois de entrar, o administrador poderá cadastrar os demais usuários.

---

## 6. Iniciando o back-end

Com tudo configurado:

```bash
npm run dev
```

O servidor será iniciado na porta definida no `.env`.

---

# Front-end

## 7. Configurando o cliente

Abra outro terminal e entre na pasta do front-end:

```bash
cd desafio-controle-chamado/client
```

Instale as dependências:

```bash
npm install
```

Depois crie o arquivo `.env.local`:

```env
# rota de acesso ao back end (porta 5000 conforme .env server) 
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Se sua API estiver rodando em outra porta, basta alterar esse valor.

---

## 8. Iniciando o front-end

Execute:

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```

---

# Primeiro acesso

Com o front-end e o back-end rodando:

1. Acesse o sistema.
2. Faça login utilizando o usuário criado pelo `admin_creator`.
3. No primeiro acesso, o sistema vai solicitar a alteração da senha.
4. Depois da alteração, você terá acesso ao sistema como administrador.
5. A partir daí, é possível cadastrar os demais usuários.

# Estrutura do projeto

A estrutura principal ficou separada entre cliente e servidor:

# Segurança

Algumas decisões do projeto foram tomadas pensando na segurança da autenticação:

* JWT para controle da sessão
* Token armazenado em Cookie **HTTP-Only**
* `SameSite` configurado nos cookies
* Middleware para proteção das rotas
* Controle de acesso por perfil
* Validação da sessão no back-end

A escolha de utilizar Cookie HTTP-Only em vez de `localStorage` foi feita para que o token não fique disponível diretamente para scripts executados no navegador.

---

# Scripts

### Back-end

```bash
npm install

npm run tables_creator

npm run admin_creator

npm run dev
```

### Front-end

```bash
npm install

npm run dev
```
