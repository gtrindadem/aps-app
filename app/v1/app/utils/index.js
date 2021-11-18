const StringUtils = require('./StringUtils');
const NumberUtils = require('./NumberUtils');
const ObjectUtils = require('./ObjectUtils');

const index = {
  ...StringUtils,
  ...NumberUtils,
  ...ObjectUtils
}

module.exports = index;