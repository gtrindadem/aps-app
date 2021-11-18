const DomainException = require('./../exceptions/DomainException').DomainException;
const MSG_ERR1 = 'Valor é nulo!';

const COD1 = 'OBJ_001';
const COD2 = 'OBJ_002';

function notNull(value) {
  if(isNull(value)) {
    throw new DomainException(MSG_ERR1, COD1);
  } 
  return (value !== null && value !== undefined);
}

function isNull(value) {
  return (value === null || value === undefined);
}

function mustBeEquels(var1, var2) {
  if(var1 !== var2) {
    const MSG = `Valor ${var1} é diferente de ${var2} !`
    throw new DomainException(MSG, COD2);
  }
}

module.exports = { isNull, notNull, mustBeEquels }