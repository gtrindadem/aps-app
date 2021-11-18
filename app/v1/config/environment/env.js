
function getEnv(key) {
  const env = process.env.NODE_ENV;
  let source = 'config/environment/.env'
 
  if (env) {
    source += `.${env}`;
  }
  require('dotenv').config({  
    path: source
  });
  return process.env[key];
}

const Env = { getEnv }

module.exports = Env;
