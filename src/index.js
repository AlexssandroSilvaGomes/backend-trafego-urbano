const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


/*
TESTES COM CURL (para executar o servidor rode npm run dev)

CREATE USER
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Teste",
  "email": "teste@example.com",
  "password": "senha123"
}'

GET USER
curl -X GET http://localhost:3000/api/users/1

UPDATE USER
curl -X PUT http://localhost:3000/api/users/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "Nome Atualizado",
  "email": "teste_atualizado@example.com",
  "password": "novaSenha123"
}'

DELETE USER
curl -X DELETE http://localhost:3000/api/users/1

LOGIN
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "teste@example.com",
  "password": "senha123"
}'

PASSWORD RESET
curl -X POST http://localhost:3000/api/users/reset-password \
-H "Content-Type: application/json" \
-d '{
  "email": "teste@example.com"
}'

CONFIRM PASSWORD RESET
curl -X POST http://localhost:3000/api/users/confirm-reset \
-H "Content-Type: application/json" \
-d '{
  "email": "teste@example.com",
  "code": "SEU_CODIGO_AQUI",
  "newPassword": "novaSenha123"
}'
*/