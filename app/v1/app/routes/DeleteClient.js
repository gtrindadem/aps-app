module.exports = app => {
  console.info('[DELETE]: /clients/:cpf');
  const usecase = app.usecase.RemoveClientByCpfUsecase;
  
  app.route('/api/v1/clients/:cpf').delete((req, res, next) => {
  usecase.remove(req.params.cpf).then((sucess) => {
    console.info('\n[Sucesso]: ' + JSON.stringify(sucess));
    res.status(204).json({mensagem: sucess});
  }).catch((err) => next(err));
  });
}