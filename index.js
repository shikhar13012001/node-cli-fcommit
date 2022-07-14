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

(async () => {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);
  input.includes(`version`) && cli.showVersion(0);
  const { message, branch } = flags;
  if (!isSafe({ message })) {
    return;
  }
  



  console.log(`\nCommit message: ${flags.message}\n`);
  console.log(`\nBranch name: ${flags.branch}\n`);
  console.log(`\nCommitting...\n`);
  const commit = () => {
    if (flags.push) {
      if (flags.upstream) {
        alert({
          type: `info`,
          name: `INFO`,
          msg: `Pushing upstream to remote...`,
        });
        return `git add . && git commit -m "${flags.message}" && git push -u origin ${flags.branch}`;
      }
      alert({ type: `info`, name: `INFO`, msg: `Pushing to remote...` });
      return `git add . && git commit -m "${flags.message}" && git push origin ${flags.branch}`;
    }
	  alert({
      type: `info`,
      name: `INFO`,
      msg: `Committing changes ...`,
    });
    return `git add . && git commit -m "${flags.message}"`;
  };

  // run git add  command
  const add = require("child_process").execSync(commit());
  console.log(add.toString());
  // check if there is any error
  if (add.error) {
	alert({
		type: `error`,
		name: `ERROR`,
		msg: `Something went wrong. Please check the error message.`,
	});
	return;
	  }
	  else
	  {
		alert({
			type: `success`,
			name: `SUCCESS`,
			msg: `Commit successful.`,
		});
	  }


  debug && log(flags);
})();
