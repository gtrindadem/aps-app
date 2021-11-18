const Utils = require('./../../utils/index');
const DomainException = require('./..//../exceptions/DomainException').DomainException;

const MSG_ERR1 = 'Nome possui valor inválido!';
const COD1 = 'NM_001';

function Name(value) {
  try {
    Utils.notNull(value);
    Utils.onlyString(value);
  } catch(err) {
    throw new DomainException(MSG_ERR1, COD1, err);
  }
  
  value = Utils.TitleCase(value);
  
  return {
      name : value
  };
}

module.exports = { Name }