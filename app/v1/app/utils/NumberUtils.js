const DomainException = require('./../exceptions/DomainException').DomainException;

const MSG_ERR1 = 'Valor não é numérico!';
const COD1 = 'NUM_001';

function onlyNumber(value) {
  if(isNaN(value)) {
    throw new DomainException(MSG_ERR1, COD1);
  } 
  return value;
}

function isNumber(value) {
  return !(isNaN(value));
}

function paddingLeft(value, size) {
  let num = '';
  onlyNumber(value);
  onlyNumber(size);
  value = value.toString();
  while (num.length < size) {
    num += 0;
  }
  return (num.substr(value.length) + value); 
}

module.exports = { 
     isNumber, 
     onlyNumber, 
     paddingLeft
   }