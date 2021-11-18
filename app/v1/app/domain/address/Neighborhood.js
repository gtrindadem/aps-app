const DomainException = require('./../../exceptions/DomainException').DomainException;
const Utils = require('./../../utils/index');


const MSG_ERR1 = 'Bairro inválido!';
const COD1 = 'END_011';
const SIZE = 100;

function Neighborhood(value) {
  try {
    Utils.notNull(value);
    Utils.onlyString(value);
    Utils.mustBeEquels((value.length <= SIZE), true);
    value = Utils.TitleCase(value);
    return {
      value: value
    }
  } catch(err) {
    throw new DomainException(MSG_ERR1, COD1, err);
  }
}

module.exports = { Neighborhood }