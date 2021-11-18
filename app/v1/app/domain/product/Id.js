const Utils = require('./../../utils/index');
const DomainException = require('./../../exceptions/DomainException').DomainException;
const { v4: uuid_v4 } = require('uuid');

const MSG_ERR1 = 'Id possui valor inválido!';
const COD1 = 'NUM_002';

function Id() {
    try {
      value = uuid_v4()
      Utils.notNull(value);
  
      return {        
        id: value
      };
    } catch (ex) {
      throw new DomainException(MSG_ERR1, COD1, ex);
    }
}
module.exports = { Id }