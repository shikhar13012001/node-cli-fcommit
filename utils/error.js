const alert = require("cli-alerts");
const isSafe = ({ message }) => {
  if (!message) {
    // remove leading commas from message
    message = message.replace(/^,+/, "");
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
