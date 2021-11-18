const Utils = require('./../utils/index');
const DomainException = require('./../exceptions/DomainException').DomainException;

const MSG_ERR1 = 'Sexo inválido!';
const COD1 = 'GN_001';
const genderList = ['Male', 'Female'];

function Gender(value) {
  try {
    Utils.notNull(value);
    Utils.onlyString(value);
    value = isValid(value);
    return {
      value: value
    };
  } catch(err) {
    throw new DomainException(MSG_ERR1, COD1, err);
  }
}


function isValid(value) {
  value = genderList.find((gender) => Utils.mustBeEquelsIgnoreCase(gender, value));
  if (!value) {
    throw new DomainException(MSG_ERR1, COD1);
  }
  value = Utils.TitleCase(value);
  return value;
}

module.exports = { Gender }