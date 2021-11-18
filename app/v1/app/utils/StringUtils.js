const DomainException = require('./../exceptions/DomainException').DomainException;
const Logger = require('./../../config/Logger');

const MSG_ERR1 = 'Valor % não é uma string!';
const MSG_ERR2 = 'A string não deve ser vazia!';
const COD1 = 'OBJ_001';

function isString(value) {
  return typeof value === 'string';
}

function onlyString(value) {
  if(!isString(value)) {
    value = JSON.stringify(value);
    Logger.LogError(value);
    throw new DomainException(MSG_ERR1.replace('%',value), COD1);
  }
}

function mustBeEquelsIgnoreCase(var1, var2) {
  onlyString(var1);
  onlyString(var2);
  return var1.toLowerCase() === var2.toLowerCase();
}

function isEmpty(value) {
  return isString(value) && value === '';
}

function notEmpty(value) {
  onlyString(value);
  if(isEmpty(value)) {
    throw new DomainException(MSG_ERR2, COD1);
  }
}

function TitleCase(text) {
  if (!text) {
    return '';
  }
  const newTxt = [];
  text.toLowerCase().split(' ').forEach((txt) => {
    const upper = txt.substr(0,1).toUpperCase();
    txt = upper + txt.substr(1, txt.length);
    newTxt.push(txt);
  })
  
  return newTxt.join(' ');
}

const StringUtils = {
  isString, 
  isEmpty, 
  onlyString,
  TitleCase,
  mustBeEquelsIgnoreCase
}

module.exports = StringUtils;