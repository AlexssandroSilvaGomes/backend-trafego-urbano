const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailUtils = require('../utils/emailUtils');

let users = [];
let resetRequests = {}; // Armazena pedidos de redefinição de senha temporariamente

const generateResetCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Criar usuário
const registerUser = async (name, email, password) => {
  if (users.find(user => user.email === email)) {
    throw new Error('Email já cadastrado.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

// Ler usuário
const getUserById = (id) => {
  const user = users.find(user => user.id === id);
  if (!user) throw new Error('Usuário não encontrado.');
  return user;
};

// Atualizar usuário
const updateUser = async (id, updatedData) => {
  const user = users.find(user => user.id === id);
  if (!user) throw new Error('Usuário não encontrado.');

  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }

  Object.assign(user, updatedData);
  return user;
};

// Deletar usuário
const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index === -1) throw new Error('Usuário não encontrado.');

  users.splice(index, 1);
  return { message: 'Usuário deletado com sucesso.' };
};

// Login
const loginUser = async (email, password) => {
  const user = users.find(user => user.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciais inválidas.');
  }

  const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
  return token;
};

// Solicitar redefinição de senha
const requestPasswordReset = async (email) => {
  const user = users.find(user => user.email === email);
  if (!user) throw new Error('Email não encontrado.');

  const code = generateResetCode();
  resetRequests[email] = { code, expires: Date.now() + 15 * 60 * 1000 }; // 15 minutos

  await emailUtils.sendEmail(email, 'Redefinição de Senha', `Seu código é: ${code}`);
};

// Confirmar redefinição de senha
const confirmPasswordReset = async (email, code, newPassword) => {
  const request = resetRequests[email];
  if (!request || request.code !== code || Date.now() > request.expires) {
    throw new Error('Código inválido ou expirado.');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const user = users.find(user => user.email === email);
  user.password = hashedPassword;

  delete resetRequests[email]; // Remover o pedido após o uso
};

module.exports = {
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  requestPasswordReset,
  confirmPasswordReset,
};
