module.exports = app => {
  console.info('[GET]: /clients');
  const usecase = app.usecase.GetClientsUsecase;
  
  app.route('/api/v1/clients').get((req, res, next) => {
  usecase.getAll().then((db) => {

    console.info('\n[Sucesso]: ' + JSON.stringify(db));
    res.status(200).json(db);
    }).catch((err) => next(err));
  });
}