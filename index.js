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
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);
  input.includes(`version`) && cli.showVersion(0);
  const { message, branch } = flags;
  if (!message) {
    alert({
      type: `error`,
      name: `ERROR`,
      msg: `Please provide commit message`,
    });

    return;
  }
  if (!branch) {
    alert({
      type: `error`,
      name: `ERROR`,
      msg: `Please provide branch name`,
    });

    return;
  }
  console.log(`\nCommit message: ${flags.message}\n`);
  console.log(`\nBranch name: ${flags.branch}\n`);
  console.log(`\nCommitting...\n`);
  // run git add  command
  const add = require("child_process").execSync(
	`git add . && git commit -m "${flags.message} "`
	  );

  // run git commit command
//   const commit = require("child_process").spawn("git", [
//     "commit",
//     "-m",
//     flags.message,
//   ]);
//   commit.stdout.on("data", (data) => {
//     console.log(data.toString());
//   });
  console.log(`\nCommitted!\n`);

  debug && log(flags);
})();
