module.exports = app => {
  console.info('[GET]: /products/:id');
  const usecase = app.usecase.GetProductByIdUsecase;
  
  app.route('/api/v1/products/:id').get((req, res, next) => {
  usecase.get(req.params.id).then((product) => {
    
    console.info('\n[Sucesso]: ' + JSON.stringify(product));
    res.status(200).json(product);
  }).catch((err) => next(err));
  });
}