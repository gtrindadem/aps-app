const Street = require('./Street').Street;
const City = require('./City').City;
const Neighborhood = require('./Neighborhood').Neighborhood;
const AddressNumber = require('./AddressNumber').AddressNumber;
const PostalCode = require('./PostalCode').PostalCode;
const State = require('./State').State;
const AddressFactory = require('./AddressFactory');

const index = {
  Street,
  City,
  Neighborhood,
  AddressNumber,
  PostalCode,
  State,
  AddressFactory
}

module.exports = index;