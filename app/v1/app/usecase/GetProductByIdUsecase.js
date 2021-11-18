const Utils = require('./../utils/index');

module.exports = app => {
  const service = app.services.ProductService;

  const usecase = {};
  
  usecase.get = (id) => new Promise((res, rej) => {
    Utils.notNull(id)
    Utils.onlyString(id)
    res(id);
  }).then(service.getById);
    
  return usecase;
}