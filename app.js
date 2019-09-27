// Importação das dependências…
const express = require('express');
const bodyParser = require('body-parser');
const logger = require ('morgan');
const mongoose = require ('mongoose');
const getSecret = require('./secrets');

const game = require ('./routes/game');
const manager = require ('./routes/manager');
const user = require ('./routes/user');

const app = express();
const API_PORT = process.env.PORT || 3001;

mongoose.connect(getSecret.bdUri, { useNewUrlParser: true });
var bd = mongoose.connection;
bd.on('error', console.error.bind(console, 'Erro de Conexão com MongoDB:'));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static('public'));

app.use('/api/games', game);
app.use('/api/managers', manager);
app.use('/api/users', user);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.listen(API_PORT, "0.0.0.0", () => console.log(`Carregando na porta: ${API_PORT}`));
