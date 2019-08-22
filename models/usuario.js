// models/usuario.js

// Importa dependências
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Cria nova instância do 'mongoose.schema'. O 'schema' pega um objeto que mostra a forma dos dados do BD.
const UsuarioSchema = new Schema({
  // códigos aqui
}, { timestamps: true });

// Cria Model Usuario com base no UsuarioSchema
const Usuario = mongoose.model('Usuario', UsuarioSchema, 'usuarios');

// Exporta este módulo para ser usado em server.js
module.exports = Usuario;

// Funções Aqui...