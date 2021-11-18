const UnexpectedException = require('./UnexpectedException').UnexpectedException;
const EntryPointException = require('./EntryPointException').EntryPointException;
const DomainException = require('./DomainException').DomainException;

const index = {
  UnexpectedException,
  EntryPointException,
  DomainException
}

module.exports = index;