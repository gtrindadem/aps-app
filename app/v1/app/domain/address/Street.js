const DomainException = require('./../../exceptions/DomainException').DomainException;
const Utils = require('./../../utils/index');

const MSG_ERR1 = 'Rua inválida!';
const COD1 = 'END_001';
const SIZE = 100;

function Street(value) {
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

module.exports = { Street }