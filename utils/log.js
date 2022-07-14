const alert = require("cli-alerts");
const chalk = require("chalk");
module.exports = (info) => {
 
  console.log(chalk[info.type](info.msg));
  
};
