const Utils = require('./../../utils/index');
const Endereco = require('./index');

function Validator(address, json) {
  const aPostalCode = Endereco.PostalCode(json.cep);
  const aNeighborhood = Endereco.Neighborhood(json.bairro);
  const aCity = Endereco.City(json.localidade);
  const aState = Endereco.State(json.uf);
  
  Utils.mustBeEquels(address.postalCode, aPostalCode.value);
  Utils.mustBeEquelsIgnoreCase(address.city, aCity.value);
  Utils.mustBeEquelsIgnoreCase(address.neighborhood, aNeighborhood.value);
  Utils.mustBeEquelsIgnoreCase(address.state, aState.value);
  
  return address;
}

const service = { Validator };

module.exports = service;