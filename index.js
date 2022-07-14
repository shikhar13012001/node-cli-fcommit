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

(async () => {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);
  input.includes(`version`) && cli.showVersion(0);
  const { message, branch } = flags;
  if (!isSafe({ message })) {
    return;
  }

  log({ msg: `\nCommit message: ${flags.message}\n`, type: `magenta` });
  log({ msg: `\nBranch name: ${flags.branch}\n`, type: `yellow` });
  log({ msg: `\nCommitting...\n`, type: `blue` });

  // run git add  command
  const add = require("child_process").execSync(commit(flags));

  // check if there is any error
  if (add.error) {
    alert({
      type: `error`,
      name: `ERROR`,
      msg: `Something went wrong. Please check the error message.`,
    });
    return;
  } else {
    alert({
      type: `success`,
      name: `SUCCESS`,
      msg: `Commit successful.`,
    });
  }

  debug && console.log(flags);
})();
