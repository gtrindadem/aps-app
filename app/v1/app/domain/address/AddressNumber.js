const DomainException = require('./../../exceptions/DomainException').DomainException;
const Utils = require('./../../utils/index');

const MSG_ERR1 = 'Numero inválido!';
const COD1 = 'END_012';

function AddressNumber(value) {
    try {
      Utils.notNull(value);
      Utils.onlyNumber(value);
      
      return {        
        value: value
      };
    } catch (ex) {
      console.log(ex)
      throw new DomainException(MSG_ERR1, COD1, ex);
    }
}

module.exports = { AddressNumber }