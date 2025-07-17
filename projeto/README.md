# API Sistema de Biblioteca

Sistema de gerenciamento de biblioteca com funcionalidades de cadastro, listagem e empréstimo de livros.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Superset do JavaScript
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados

## 📋 Funcionalidades

- ✅ Cadastro de novos livros
- ✅ Listagem de livros com filtros
- ✅ Sistema de empréstimo
- ✅ Validações robustas
- ✅ Tratamento de erros

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Configurar banco de dados
npm run db:generate
npm run db:push

# Iniciar servidor de desenvolvimento
npm run dev
```

## 📊 Banco de Dados

O sistema utiliza SQLite com o seguinte modelo:

```prisma
model Livro {
  id            Int      @id @default(autoincrement())
  titulo        String
  autor         String
  anoPublicacao Int
  disponivel    Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## 🌐 Rotas da API

### Health Check
```
GET /api/health
```

### Livros

#### Criar livro
```
POST /api/livros
Content-Type: application/json

{
  "titulo": "1984",
  "autor": "George Orwell",
  "anoPublicacao": 1949
}
```

#### Listar livros
```
GET /api/livros
GET /api/livros?autor=George
GET /api/livros?disponivel=true
GET /api/livros?autor=George&disponivel=false
```

#### Emprestar livro
```
PATCH /api/livros/1/emprestar
```

## ✅ Validações

- **Título**: Obrigatório, string não vazia
- **Autor**: Obrigatório, string não vazia  
- **Ano de Publicação**: Obrigatório, número, não pode ser futuro
- **Empréstimo**: Só permite se livro estiver disponível

## 🧪 Testando com Postman/Insomnia

### 1. Health Check
```
GET http://localhost:3000/api/health
```

### 2. Criar alguns livros
```
POST http://localhost:3000/api/livros
{
  "titulo": "1984",
  "autor": "George Orwell",
  "anoPublicacao": 1949
}

POST http://localhost:3000/api/livros
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "anoPublicacao": 1899
}
```

### 3. Listar livros
```
GET http://localhost:3000/api/livros
GET http://localhost:3000/api/livros?autor=George
GET http://localhost:3000/api/livros?disponivel=true
```

### 4. Emprestar livro
```
PATCH http://localhost:3000/api/livros/1/emprestar
```

### 5. Verificar se empréstimo funcionou
```
GET http://localhost:3000/api/livros/1
```

## 🚨 Códigos de Status

- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Erro de validação
- **404** - Recurso não encontrado
- **500** - Erro interno do servidor

## 📝 Exemplos de Resposta

### Sucesso na criação:
```json
{
  "message": "Livro criado com sucesso",
  "data": {
    "id": 1,
    "titulo": "1984",
    "autor": "George Orwell",
    "anoPublicacao": 1949,
    "disponivel": true,
    "createdAt": "2025-01-11T...",
    "updatedAt": "2025-01-11T..."
  }
}
```

### Erro de validação:
```json
{
  "error": "Ano de publicação não pode ser no futuro"
}
```