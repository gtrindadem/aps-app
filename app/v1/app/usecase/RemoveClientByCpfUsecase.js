const Cpf = require('./../domain/Cpf').Cpf;

module.exports = app => {
  const service = app.services.ClientService;
  const usecase = {};
  
  usecase.remove = (cpf) => new Promise((res, rej) => {
    const aCpf = Cpf(cpf);
    res(aCpf.value);
  }).then(service.remove);
    
  return usecase;
}