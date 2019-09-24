// Importação das dependências…
const express = require('express');
const bodyParser = require('body-parser');
const logger = require ('morgan');
const mongoose = require ('mongoose');
const getSecret = require('./secrets');

const manager = require ('./routes/manager');

// Criação das instâncias
const app = express();

// Setar a porta para ou uma porta pré-determinada ou 3001
const API_PORT = process.env.PORT || 3001;

// Configuração do banco de dados -- URI está em secrets.js
mongoose.connect(getSecret.bdUri, { useNewUrlParser: true });
var bd = mongoose.connection;
bd.on('error', console.error.bind(console, 'Erro de Conexão com MongoDB:'));

// Configuração da API (bodyParser)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Configurando arquivos estáticos
app.use(express.static('public'));

// Redireciona o link para sua respectiva rota
app.use('/api/managers', manager);

// Setar o caminho da rota & inicializa a API
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.listen(API_PORT, "0.0.0.0", () => console.log(`Carregando na porta: ${API_PORT}`));
