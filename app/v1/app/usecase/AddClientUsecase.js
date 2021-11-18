const Client = require('./../domain/Client').Client;
const AddressFactory = require('./../domain/address/AddressFactory');
const Validator = require('./../domain/address/Validator').Validator;
const Service = require('./../services/GetAddressService');


module.exports = app => {
  console.info('[Iniciando]:[POST] config usecase clients');
  const service = app.services.ClientService;
  const usecase = {};
  
  usecase.add = (client) => new Promise((res, rej) => {
    const address = AddressFactory.CreateAddress(client.address);
    return Service.GetAddress(address, Validator)
      .then((address) => {
      
    const newClient = Client(
    client.name, 
    client.age, 
    client.gender, 
    client.cpf, 
    address);
    
    res(newClient);
    }).catch((err) => rej(err));
  }).then(service.add);
    
  return usecase;
}