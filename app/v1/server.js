const app = require('./config/express')();
const port = app.get('port');

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(JSON.stringify(app.routes))
  console.log(`Servidor rodando na porta ${port}`)
});