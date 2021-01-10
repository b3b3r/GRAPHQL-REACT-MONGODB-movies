const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

require('dotenv').config()

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.log(MONGO_URI);
  throw new Error('Tu dois fournir une url mongoDB');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection
  .once('open', () => console.log('Connecté à MongoDB'))
  .on('error', error => console.log('Erreur de connexion à MongoDB:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  //graphiql: true, //on peut l'activer si l'on veut utiliser grapiql, sinon l url donnera du json
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
