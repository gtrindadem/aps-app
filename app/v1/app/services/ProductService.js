const DomainException = require('../exceptions/DomainException').DomainException;
const Logger = require('../../config/Logger');

var loki = require('lokijs')
var db = new loki('db.products.json', {
  autoload: true,
  autoloadCallback : getAllFromRepo
});

module.exports = app => {

  const repository = {
    add: (product) => {
      return addRepository(product).then((mensagem) => {
        return Promise.resolve(mensagem);
      });
    },
    remove: (id) => {
     return removeRepository(id).then((mensagem) => {
        return Promise.resolve(mensagem);
      });
    },
    getById: (id) => {
      return getById(id).then((product) => {
        return Promise.resolve(product);
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
    let products = db.getCollection("products");
    if (products === null) {
      products = db.addCollection("products");
    }
    const response = []
    products.data.forEach((c) => response.push(c.product))
    resolve(response);
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    const products = db.getCollection("products");

    const product = products.data.find((productDb) => productDb.product.id.toString() === id.toString());
    if(product) {
      resolve(product.product);
    } else {
      throw new DomainException('id não cadastrado!','id_002');
    }
  });
}

function addRepository(product) {
  return new Promise((resolve, reject) => {
    const products = db.getCollection("products");

    if(products.data.filter((item) => item.product.id === product.id).length > 0) {
      throw new DomainException('ID já cadastrado!','ID_001');
    }
    
    Logger.LogInfo(product);
    products.insert({product});
    db.saveDatabase();
    resolve('producte cadastrado com sucesso!');
  });
}

function removeRepository(id) {
  return getById(id).then((product) => {
    return new Promise((resolve, reject) => {
    const products = db.getCollection("products");

      products.chain().find({'id':id.toString()}).remove();
      resolve('producte removido!');
    });
  });
}

function updateFromRepository(updateRequest) {
  return getById(updateRequest.id).then((product) => {
     product.address = updateRequest.address;
     return removeRepository(updateRequest.id, database).then((db) => addRepository(product, db))
  });
}




