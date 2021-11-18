const DomainException = require('./../../exceptions/DomainException').DomainException;
const Utils = require('./../../utils/index');


const MSG_ERR1 = 'Estado inválido!';
const COD1 = 'END_013';
const SIZE = 2;

function State(value) {
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

module.exports = { State }