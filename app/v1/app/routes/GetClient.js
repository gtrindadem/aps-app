module.exports = app => {
  console.info('[GET]: /clients/:cpf');
  const usecase = app.usecase.GetClientByCpfUsecase;
  
  app.route('/api/v1/clients/:cpf').get((req, res, next) => {
  usecase.get(req.params.cpf).then((client) => {
    
    console.info('\n[Sucesso]: ' + JSON.stringify(client));
    res.status(200).json(client);
  }).catch((err) => next(err));
  });
}