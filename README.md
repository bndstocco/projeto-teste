# API CRUD PHP MVC com JWT

## Descrição
API RESTful em PHP puro seguindo padrão **MVC e POO**, com autenticação **JWT**.  
Permite criar, ler, atualizar e deletar usuários.  
Rotas protegidas com JWT podem ser testadas via Swagger ou Postman.

---

## Endpoints

### **Públicos**
- **POST /register**  
  Cadastra um novo usuário  
  **Request Body:** JSON `{ "name": "string", "email": "string", "password": "string" }`  

- **POST /login**  
  Autentica usuário e retorna JWT  
  **Request Body:** JSON `{ "email": "string", "password": "string" }`  
  **Response:** `{ "token": "JWT_TOKEN_AQUI" }`  

---

### **Protegidos (necessitam JWT)**

> Header: `Authorization: Bearer <token>`

- **GET /users**  
  Lista todos os usuários  

- **POST /users**  
  Cria um novo usuário  
  **Request Body:** JSON `{ "name": "string", "email": "string", "password": "string" }`  

- **PUT /users**  
  Atualiza usuário existente  
  **Request Body:** JSON `{ "name": "string", "email": "string", "password": "string" }`  

- **DELETE /users**  
  Deleta um usuário  
  **Request Body:** JSON `{ "id": "integer" }` ou parâmetro query `?id=1`  

---

## Autenticação

- JWT gerado no login  
- Necessário enviar no header das rotas protegidas:  

Authorization: Bearer <token>

---

## Testando a API

- Rodando local: `php -S localhost:8000 -t public`  
- Swagger UI disponível: `http://localhost:8000/swagger/`  
- Pode usar Postman ou React para consumir as rotas.

---

## Observações

- Senhas armazenadas com **hash seguro (bcrypt)**  
- Seguindo padrão **MVC**, fácil de expandir  
- JWT controla acesso às rotas sensíveis

## Frontend React

O frontend consome a API CRUD PHP MVC com JWT. Permite registrar usuários, fazer login, listar, atualizar e deletar usuários.

## Configuração do projeto

Criar projeto React:

npx create-react-app frontend
cd frontend


## Instalar dependências (opcional, mas recomendado para requisições HTTP):

npm install axios

Rodando o frontend
npm start


O app abrirá em http://localhost:3000.
A API deve estar rodando em http://localhost:8000.

Pull request feito com sucesso na minha-branch.gi