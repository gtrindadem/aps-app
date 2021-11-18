const Logger = require('../../config/Logger');

function UnauthorizedException(message) {
    this.name = "Unauthorized";
    this.message = message || 'Cliente não autorizado';
    this.status = 401;
    this.model = {mensagem: this.message, code: 'AUTH_401' };
    Logger.LogError(this);
}
UnauthorizedException.prototype = Error.prototype;

module.exports = { UnauthorizedException }