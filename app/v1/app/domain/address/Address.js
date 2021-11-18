const DomainException = require('./../../exceptions/DomainException').DomainException;
const container = require('./index');

const MSG_ERR1 = 'Endereço possui valor inválido!';
const COD1 = 'END_001';

function Address(street, city, neighborhood, number, postalCode, state) {
  try {
    const aStreet = container.Street(street);
    const aCity = container.City(city);
    const aNeigborhood = container.Neighborhood(neighborhood);
    const aNumber = container.AddressNumber(number);
    const aPostalCode = container.PostalCode(postalCode);
    const aState = container.State(state);
    
    return {        
        street: aStreet.value,
        city: aCity.value,
        neighborhood: aNeigborhood.value,
        number: aNumber.value,
        postalCode: aPostalCode.value,
        state: aState.value
      };
  } catch (err) {
    throw new DomainException(MSG_ERR1, COD1, err);
  }
}

module.exports = { Address }