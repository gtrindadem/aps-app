const Utils = require('./../utils/index');
const DomainException = require('./../exceptions/DomainException').DomainException;

const MSG_ERR1 = 'Nome possui valor inválido!';
const MSG_ERR2 = 'Deve ser nome completo!';
const COD1 = 'NM_001';
const COD2 = 'NM_002';

function Name(value) {
  try {
    Utils.notNull(value);
    Utils.onlyString(value);
  } catch(err) {
    throw new DomainException(MSG_ERR1, COD1, err);
  }
  
  isFullName(value);
  value = Utils.TitleCase(value);
  
  return {
      firstName: getFirstName(value),
      secundName: getSecundName(value),
      fullName : value
  };
}


function isFullName(value) {
  const isFullName = value.split(' ').length >= 2;
  if (!isFullName) {
    throw new DomainException(MSG_ERR2, COD2);
  }
}

function getFirstName(value) {
  return value.split(' ')[0];
}

function getSecundName(value) {
  return value.split(' ')[1];
}

module.exports = { Name }