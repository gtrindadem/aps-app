module.exports = (error, req, res, next) => {
  const UnexpectedException = require('./../app/exceptions/UnexpectedException').UnexpectedException;
  if(!error.model) {
    error = new UnexpectedException(error.stack);
    console.error(`\nCausa:\n${error.stack}`);
  }
  console.error(`\n[Falhou]: para endpoint [${req.method}]:${req.path}, com erro: ${JSON.stringify(error.model)}`);
  return res.status(error.status).json(error.model);
}