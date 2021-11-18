module.exports = app => {
  console.info('[POST]: /product');
  const usecase = app.usecase.AddProdutcUsecase;
  
  app.route('/api/v1/product').post((req, res, next) => {
  console.info('\nRequisição realizado com JSON: ' + JSON.stringify(req.body));
  
  usecase.add(req.body).then((success) => {
    console.info('\n[Sucesso]: ' + JSON.stringify(success));
    res.status(201).json({mensagem: success});
    }).catch((error) => next(error));
  });
}