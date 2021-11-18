const Utils = require('./../utils/index');
const DomainException = require('./../exceptions/DomainException').DomainException;

const MSG_ERR1 = 'Idade possui valor inválido!';
const COD1 = 'NUM_001';

function Age(value) {
    try {
      Utils.notNull(value);
      Utils.onlyNumber(value);
  
      return {        
        value: value
      };
    } catch (ex) {
      throw new DomainException(MSG_ERR1, COD1, ex);
    }
}
module.exports = { Age }