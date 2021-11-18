module.exports = app => {
  const service = app.services.ProductService;
  const usecase = {};
  
  usecase.getAll = () => new Promise((resolve,reject) => {

    resolve('Buscando produtos...')
  }).then((info) => service.getAll(info));
  
  return usecase;
}