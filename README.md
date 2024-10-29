# Documentação do Projeto

## Visão Geral

Este projeto é uma API com foco em criar um modelo de IA para calcular as melhores rotas de tráfego. Atualmente há o gerenciamento de usuários, incluindo funcionalidades de registro, login, atualização e redefinição de senha. 

## Requisitos

- Node.js
- npm (Node Package Manager)

## Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/AlexssandroSilvaGomes/backend-trafego-urbano.git

cd <NOME_DO_REPOSITÓRIO>
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor

Para iniciar o servidor em modo de desenvolvimento, execute:
```bash
npm run dev
```
O servidor estará rodando em ```http://localhost:3000```.

## Testes com CURLs

Você pode testar a API usando comandos cURL. Abaixo estão os comandos para cada operação CRUD.

### Criar Usuário
```powershell
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Teste",
  "email": "teste@example.com",
  "password": "senha123"
}'
```
### Obter Usuário
```powershell
curl -X GET http://localhost:3000/api/users/1
```
### Atualizar Usuário
```powershell
curl -X PUT http://localhost:3000/api/users/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "Nome Atualizado",
  "email": "teste_atualizado@example.com",
  "password": "novaSenha123"
}'
```
### Deletar Usuário
```powershell
curl -X DELETE http://localhost:3000/api/users/1
```
### Login
```powershell
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "teste@example.com",
  "password": "senha123"
}'
```
### Redefinir Senha
```powershell
curl -X POST http://localhost:3000/api/users/reset-password \
-H "Content-Type: application/json" \
-d '{
  "email": "teste@example.com"
}'
```
### Confirmar Redefinição de Senha
```powershell
curl -X POST http://localhost:3000/api/users/confirm-reset \
-H "Content-Type: application/json" \
-d '{
  "email": "teste@example.com",
  "code": "SEU_CODIGO_AQUI",
  "newPassword": "novaSenha123"
}'
```