const exceptions = require('../exceptions/index');
const EntryPointException = exceptions.EntryPointException;
const fetch = require('node-fetch');
const MSG_ERR1 = 'Endereço nao encontrado!';
const COD1 = 'APICEP_001';

async function GetAddress(address, Validator) {
  const res = await fetch(`https://viacep.com.br/ws/${Number(address.postalCode)}/json/`)
    .then((res) => Promise.resolve(res.json()))
    .catch((err) => {
      return Promise.reject(new EntryPointException(err));
  });
  
  return Validator(address, res);
}

const service = { GetAddress };

module.exports = service;