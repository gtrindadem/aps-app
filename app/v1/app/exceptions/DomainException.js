const Logger = require('../../config/Logger');

function DomainException(message, code, error) {
    let cause = [];
    if (error) {
      cause = error.causes || [];
      cause.push({mensagem: error.message, code: error.code});
    }
    this.name = "DomainError";
    this.message = message;
    this.status = 422;
    this.causes = cause;  
    this.code = code;
    this.model = {mensagem: message, code: code}
    Logger.LogError(this);
}
DomainException.prototype = Error.prototype;

module.exports = { DomainException }