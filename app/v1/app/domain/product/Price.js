const Utils = require('./../../utils/index');
const DomainException = require('./../../exceptions/DomainException').DomainException;

const MSG_ERR1 = 'Preço possui valor inválido!';
const COD1 = 'PRECO_100';

function Price(value) {
    try {
      Utils.notNull(value);

      const formatted = getFormatted(value);
      value = validAndReturn(formatted);
      
      return {
        formatted: formatted,
        value: value
      };
    } catch (err) {
      throw new DomainException(MSG_ERR1, COD1, err);
    }
}

function getFormatted(value) {
  let valor = value + '';
  valor = valor.replace('.', ',');
  
  if (valor.includes(',')) {
    let real = valor.split(',')[0];
    let centavos = valor.split(',')[1].padEnd(2,'0');
    
    return 'R$ ' + real + ',' + centavos.substr(0,2)
  }
  return 'R$ ' + valor.fixed(2)
}

function validAndReturn(value) {
  let valor = value + '';
  
  if(isFormatted(valor)) {
    valor = valor.substr(3).replace(',', '.');
    Utils.onlyNumber(valor);
  }
  return valor;
}

function isFormatted(value) {
  return Utils.isString(value) || value.includes('R$ ');
}

module.exports = { Price }