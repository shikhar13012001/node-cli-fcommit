const alert = require("cli-alerts");
const isSafe = ({ branch, message }) => {
  if (!message) {
    alert({
      type: `error`,
      name: `ERROR`,
      msg: `Please provide commit message`,
    });

    return false;
  }
  if (!branch) {
    alert({
      type: `error`,
      name: `ERROR`,
      msg: `Please provide branch name`,
    });

    return false;
  }
  return true;
};
module.exports = isSafe;
