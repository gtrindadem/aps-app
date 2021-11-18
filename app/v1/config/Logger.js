const Env = require('./environment/env');

function LogInfo(message) {
  
  if (verify(message)) {
    console.info('\nLogando modo DEBUG:');
    console.info(message);
  }
}

function LogError(error) {
  
  if (verify(error)) {
    console.info('\nLogando modo DEBUG:');
    console.info(error);
  }
}

function verify(obj) {
  return Env.getEnv('DEBUG') && obj;
}

const logs = { LogError, LogInfo }

module.exports = logs;