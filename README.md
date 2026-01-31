API CRUD PHP MVC (resumida)
Descrição

API RESTful em PHP puro, seguindo MVC e POO, com autenticação JWT.
Permite criar, ler, atualizar e deletar usuários, com rotas protegidas por token.

Rotas Públicas
Método	Endpoint	Descrição
POST	/register	Cadastra um novo usuário
POST	/login	Faz login e retorna token JWT
Rotas Protegidas (JWT)
Método	Endpoint	Descrição
GET	/users	Lista todos os usuários
POST	/users	Cria um novo usuário
PUT	/users	Atualiza um usuário existente
DELETE	/users	Deleta um usuário

Header obrigatório:
Authorization: Bearer <token>

Exemplo de consumo

Login para obter token:

POST /login
{
  "email": "teste@teste.com",
  "password": "123456"
}


Listar usuários usando token:

GET /users
Authorization: Bearer <token>

Observações

Senhas são armazenadas com hash seguro (bcrypt).

JWT usado para proteger todas as operações CRUD de usuários.

/register e /login são públicas, todas as outras rotas exigem token.
