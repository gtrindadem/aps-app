const Logger = require('../../config/Logger');

function UnexpectedException(stack, message) {
    this.name = "UnexpectedError";
    this.message = message || 'Erro não esperado';
    this.status = 500;
    this.stack = stack;
    this.model = {mensagem: this.message, code: 'ERR_500' };
    Logger.LogError(this);
}
UnexpectedException.prototype = Error.prototype;

module.exports = { UnexpectedException }