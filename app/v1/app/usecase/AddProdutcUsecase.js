const Product = require('../domain/product/Product').Product;

module.exports = app => {
  console.info('[Iniciando]:[POST] config usecase produtcs');
  const service = app.services.ProductService;
  const usecase = {};
  
  usecase.add = (product) => new Promise((res, rej) => {
    const newProduct = Product(product.name, product.price);
    res(newProduct);
  }).then(service.add);
    
  return usecase;
}