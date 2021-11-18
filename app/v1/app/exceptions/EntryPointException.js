const Logger = require('../../config/Logger');

function EntryPointException(error, message) {
    this.name = "EntryPointException";
    this.message = message || 'Servico indisponivel!';
    this.status = 504;
    this.api = error;
    this.model = {mensagem: this.message, code: 'ERR_504' };
    Logger.LogError(this);
}
EntryPointException.prototype = Error.prototype;

module.exports = { EntryPointException }