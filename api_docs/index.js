const apis = require('./apis');
const basicInfo = require('./basicInfo');
const serverInfo = require('./serverInfo');

module.exports = {
  ...basicInfo,
  ...serverInfo,
  ...apis,
};
