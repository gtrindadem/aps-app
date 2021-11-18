const Utils = require('./../utils/index');
const DomainException = require('./../exceptions/DomainException').DomainException;

const MSG_ERR1 = 'Cpf possui valor inválido!';
const COD1 = 'CPF_100';

function Cpf(value) {
    try {
      Utils.notNull(value);
      value = validAndReturn(value);
      const formatted = getFormatted(value);
      
      return {
        formatted: formatted,
        value: value
      };
    } catch (err) {
      throw new DomainException(MSG_ERR1, COD1, err);
    }
}

function getFormatted(value) {
  return value.toString().replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, "$1.$2.$3-$4");
}

function validAndReturn(value) {
  if(isFormatted(value)) {
    const newValue = value.split('.').join('').replace('-', '');
    Utils.mustBeEquels(newValue.length, 11);
    Utils.mustBeEquels(getFormatted(newValue), value);
    value = newValue;
  }
  Utils.onlyNumber(value);
  return value;
}

function isFormatted(value) {
  return Utils.isString(value) && !Utils.isNumber(value);
}

module.exports = { Cpf }