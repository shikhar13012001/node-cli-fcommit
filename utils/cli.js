const meow = require("meow");
const meowHelp = require("cli-meow-help");

const flags = {
  clear: {
    type: `boolean`,
    default: false,
    alias: `c`,
    desc: `Clear the console`,
  },
  noClear: {
    type: `boolean`,
    default: false,
    desc: `Don't clear the console`,
  },
  debug: {
    type: `boolean`,
    default: false,
    alias: `d`,
    desc: `Print debug info`,
  },
  version: {
    type: `boolean`,
    alias: `v`,
    desc: `Print CLI version`,
  },
  message: {
    type: `string`,
    alias: `m`,
    desc: `Commit message`,
  },
  branch: {
    type: `string`,
    alias: `b`,
    desc: `Branch name`,
  },
  push: {
    type: `boolean`,
    alias: `p`,
    desc: `Push to remote`,
  },
  upstream: {
    type: `boolean`,
    alias: `u`,
    desc: `Push to upstream`,
  },
};

const commands = {
  help: { desc: `Print help info` },
  version: { desc: `Print CLI version` },
  clear: { desc: `Clear the console` },
  debug: { desc: `Print debug info` },
  message: { desc: `Commit message` },
  branch: { desc: `Branch name` },
  push: { desc: `Push to remote` },
  upstream: { desc: `Push to upstream` },
};

const helpText = meowHelp({
  name: `fcommit`,
  flags,
  commands,
});

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

module.exports = meow(helpText, options);
