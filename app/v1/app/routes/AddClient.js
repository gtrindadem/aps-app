module.exports = app => {
  console.info('[POST]: /client');
  const usecase = app.usecase.AddClientUsecase;
  
  app.route('/api/v1/client').post((req, res, next) => {
  console.info('\nRequisição realizado com JSON: ' + JSON.stringify(req.body));
  
  usecase.add(req.body).then((success) => {
    console.info('\n[Sucesso]: ' + JSON.stringify(success));
    res.status(201).json({mensagem: success});
    }).catch((error) => next(error));
  });
}