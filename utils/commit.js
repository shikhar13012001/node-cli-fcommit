const alert = require("cli-alerts");

const commit = (flags) => {
  let commands = [`git add .`];

  if (flags.empty) {
    alert({ type: `info`, name: `INFO`, msg: `Creating empty commit ...` });
    commands.push(`git commit --allow-empty -m "${flags.message}"`);
  } else {
    alert({ type: `info`, name: `INFO`, msg: `Committing changes ...` });
    commands.push(`git commit -m "${flags.message}"`);
  }

  if (flags.push && flags.upstream) {
    alert({ type: `info`, name: `INFO`, msg: `Pushing upstream to remote...` });
    commands.push(`git push -u origin ${flags.branch}`);
  } else if (flags.push) {
    alert({ type: `info`, name: `INFO`, msg: `Pushing to remote...` });
    commands.push(`git push origin ${flags.branch}`);
  }

  let command = commands.join(" && ");

  return command;
};

module.exports = commit;
