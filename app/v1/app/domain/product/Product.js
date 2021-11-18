const Name = require('./Name').Name;
const Id = require('./Id').Id;
const Price = require('./Price').Price;

function Product(aName, aPrice) {
 
  const validName = Name(aName);
  const validPrice = Price(aPrice);
  const validID = Id();
  
  const product = {
    name: validName.name,
    price: validPrice,
    id: validID.id
  };
  
  return product;
}

module.exports = { Product }