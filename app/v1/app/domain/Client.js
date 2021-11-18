const Name = require('./Name').Name;
const Age = require('./Age').Age;
const Gender = require('./Gender').Gender;
const Cpf = require('./Cpf').Cpf;

function Client(aName, aAge, aGender, aCpf, aAddress) {
 
  const validName = Name(aName);
  const validAge = Age(aAge);
  const validGender = Gender(aGender);
  const validCpf = Cpf(aCpf);
  
  const client = {
    name: validName.fullName,
    firstName: validName.firstName,
    age: validAge.value,
    gender: validGender.value,
    cpf: validCpf.value,
    address: aAddress
  };
  
  return client;
}

module.exports = { Client }