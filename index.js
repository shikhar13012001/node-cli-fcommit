#!/usr/bin/env node

/**
 * git-commit-helper
 * helps you commit your code in one line rather than three
 *
 * @author shikhar13012001 <https://portfolio-shikhar13012001.vercel.app/>
 */

const init = require("./utils/init");
const cli = require("./utils/cli");
const log = require("./utils/log");
const alert = require("cli-alerts");
const isSafe = require("./utils/error");
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
const commit = require("./utils/commit");
process.on("unhandledRejection", (err) => {
  alert({
    type: `error`,
    name: `ERROR`,
    msg: `${err.output.toString()}`,
  });
  // exit process
  process.exit(1);
});
(async () => {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);
  input.includes(`version`) && cli.showVersion(0);
  // get branch
  // check if grep is available in the system
  const grep = require("child_process").spawnSync("grep", ["--version"]);
  if (grep.error) {
    alert({
      type: `error`,
      name: `ERROR`,
      msg: `Grep is not available in the system. Please install it. or use git bash to run this script.`,
    });
    process.exit(1);
  }

  const currbranch = require("child_process").execSync(
    `git branch`
  );
  const Presentbranch = currbranch.toString().split("\n").find((branch) => {
    return branch.includes("*");
  }).trim().split(" ")[1];


  const { message, branch } = flags;

  if (message) {
    log({ msg: `\nCommit message: ${flags.message}\n`, type: `green` });
    log({
      msg: `\nBranch name: ${flags.branch || Presentbranch.toString()}\n`,
      type: flags.branch ? `green` : `yellow`,
    });
    log({ msg: `\nCommitting...\n`, type: `blue` });
  }

  try {
    const add = require("child_process").execSync(commit(flags));
  } catch (err) {
    if (err.output.toString().includes("nothing to commit")) {
      alert({
        type: `warning`,
        name: `WARNING`,
        msg: `${"Nothing to commit"}`,
      });
    } else {
      alert({
        type: `error`,
        name: `ERROR`,
        msg: `${err.output.toString()}`,
      });
    }

    return;
  }

  // check if there is any error

  alert({
    type: `success`,
    name: `SUCCESS`,
    msg: `Commit successful.`,
  });

  debug && console.log(flags);
})();
