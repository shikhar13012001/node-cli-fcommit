const alert = require("cli-alerts");
const isSafe = ({ message }) => {
  if (!message) {
    alert({
      type: `error`,
      name: `ERROR`,
      msg: `Please provide commit message`,
    });

    return false;
  }

  return true;
};

module.exports = isSafe;
