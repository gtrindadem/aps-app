const DomainException = require('./../exceptions/DomainException').DomainException;
const Logger = require('../../config/Logger');

var loki = require('lokijs')
var db = new loki('db.clients.json', {
  autoload: true,
  autoloadCallback : getAllFromRepo
});

module.exports = app => {

  const repository = {
    add: (client) => {
      return addRepository(client).then((mensagem) => {
        return Promise.resolve(mensagem);
      });
    },
    remove: (cpf) => {
     return removeRepository(cpf).then((mensagem) => {
        return Promise.resolve(mensagem);
      });
    },
    getByCpf: (cpf) => {
      return getByCpf(cpf).then((client) => {
        return Promise.resolve(client);
      });
    },
    getAll: (info) => {
      console.info('\n[Info]: '+info);
      return getAllFromRepo().then((db) => {
        return Promise.resolve(db);
      });
    },
    update: (updateRequest) => {
      return updateFromRepository(updateRequest).then((db) => {
        return Promise.resolve('Endereço atualizado com sucesso!');
      });
    }
  };
  
  return repository;
}

function getAllFromRepo() {
  return new Promise((resolve, reject) => {
    let clients = db.getCollection("clients");
    if (clients === null) {
      clients = db.addCollection("clients");
    }
    const response = []
    clients.data.forEach((c) => response.push(c.client))
    resolve(response);
  });
}

function getByCpf(cpf) {
  return new Promise((resolve, reject) => {
    const clients = db.getCollection("clients");

    const client = clients.data.find((clientDb) => clientDb.client.cpf.toString() === cpf.toString());
    if(client) {
      resolve(client.client);
    } else {
      throw new DomainException('Cpf não cadastrado!','CPF_002');
    }
  });
}

function addRepository(client) {
  return new Promise((resolve, reject) => {
    const clients = db.getCollection("clients");

    if(clients.data.filter((item) => item.client.cpf === client.cpf).length > 0) {
      throw new DomainException('Cpf já cadastrado!','CPF_001');
    }
    
    Logger.LogInfo(client);
    clients.insert({client});
    db.saveDatabase();
    resolve('Cliente cadastrado com sucesso!');
  });
}

function removeRepository(cpf) {
  return getByCpf(cpf).then((client) => {
    return new Promise((resolve, reject) => {
    const clients = db.getCollection("clients");

      clients.chain().find({'cpf':cpf.toString()}).remove();
      resolve('Cliente removido!');
    });
  });
}

function updateFromRepository(updateRequest) {
  return getByCpf(updateRequest.cpf).then((client) => {
     client.address = updateRequest.address;
     return removeRepository(updateRequest.cpf, database).then((db) => addRepository(client, db))
  });
}




