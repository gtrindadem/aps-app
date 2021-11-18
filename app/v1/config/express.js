const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const ErrorHandler = require('./ErrorHandler');
const Env = require('./environment/env.js');
const Utils = require('./../app/utils/index');
const UnauthorizedException = require('./../app/exceptions/UnauthorizedException').UnauthorizedException;

module.exports = () => {
  
  const app = express();
  const authClient = Env.getEnv('AUTH_CLIENT_MANAGER')
  const authManager = Env.getEnv('AUTH_CLIENT_MANAGER')

  app.set('port', process.env.PORT || Env.getEnv('PORT'));

  app.use(bodyParser.json());

  const expressMiddleware = function (req, res, next) {  
    const auth = req.headers['auth'];
    console.info('[method]: ' + req.method)
    console.info('[Auth client]: ' + Env.getEnv('AUTH_CLIENT'))
    console.info('[Auth manager]: ' + Env.getEnv('AUTH_CLIENT_MANAGER'))
    console.info('[REQUEST AUTH]: ' + req.headers['auth'])

    try {
      if(
        Utils.isString(auth) && 
        Utils.mustBeEquelsIgnoreCase(authManager, auth) || 
        Utils.mustBeEquelsIgnoreCase(authClient, auth) && req.method === 'GET') {
        
        next()
        return
      }
    } catch (error) {}

    throw new UnauthorizedException('Cliente não autorizado!');
  }
  
  app.use(expressMiddleware)

  consign({cwd: 'app'})
        .then('utils')
        .then('database')
        .then('services')
        .then('exceptions')
        .then('domain')
        .then('usecase')
        .then('routes')
        .into(app);
  
  app.use(ErrorHandler);
  
  return app;
}