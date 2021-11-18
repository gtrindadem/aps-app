const DomainException = require('./../../exceptions/DomainException').DomainException;
const Utils = require('./../../utils/index');

const MSG_ERR1 = 'CEP possui valor inválido!';
const COD1 = 'CEP_001';
const MAX_SIZE = 8;

function PostalCode(value) {
    try {
      Utils.notNull(value);
      value = verificaString(value);
      Utils.mustBeEquels(value.length, MAX_SIZE);
      const formatted = aplicarMascara(value);
      return {        
        value: value,
        formatted: formatted,
      };
    } catch (ex) {
      throw new DomainException(MSG_ERR1, COD1, ex);
    }
}

function verificaString(value) {
  if(Utils.isString(value)) {
    if(value.includes('-')) {
      Utils.mustBeEquels(value, aplicarMascara(value.replace('-','')));
      value = value.replace('-','');
      value = Utils.paddingLeft(value, MAX_SIZE);
    }
    Utils.onlyNumber(value);
  }
  return value.toString();
}

function aplicarMascara(value) {
  return value.replace(/(\d{5})?(\d{3})/, "$1-$2");
}

module.exports = { PostalCode }