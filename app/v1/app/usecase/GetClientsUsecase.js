module.exports = app => {
  const service = app.services.ClientService;
  const usecase = {};
  
  usecase.getAll = () => new Promise((resolve,reject) => {

    resolve('Buscando clientes...')
  }).then((info) => service.getAll(info));
  
  return usecase;
}