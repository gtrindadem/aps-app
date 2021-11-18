module.exports = app => {
  console.info('[GET]: /products');
  const usecase = app.usecase.GetProductsUsecase;
  
  app.route('/api/v1/products').get((req, res, next) => {
  usecase.getAll().then((db) => {

    console.info('\n[Sucesso]: ' + JSON.stringify(db));
    res.status(200).json(db);
    }).catch((err) => next(err));
  });
}