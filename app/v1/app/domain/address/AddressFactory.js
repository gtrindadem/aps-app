const Address = require('./Address').Address;
const UnexpectedException = require('./../../exceptions/UnexpectedException').UnexpectedException;

const MSG_ERR1 = 'Falha ao tentar criar endereco!';

function CreateAddress(address) {
  try {
    return Address(
      address.street, 
      address.city, 
      address.neighborhood, 
      address.number, 
      address.postalCode, 
      address.state
    );
  } catch(err) {
    console.log(err)
    throw new UnexpectedException(err.stack, MSG_ERR1);
  }
}

module.exports = { CreateAddress };