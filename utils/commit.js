const alert = require("cli-alerts");

const commit = (flags) => {
  let commands = [`git add .`];
  
  if (flags.message&&flags.empty) {
    alert({ type: `info`, name: `INFO`, msg: `Creating empty commit ...` });
    commands.push(`git commit --allow-empty -m "${flags.message}"`);
  } else if(flags.message){
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
  if(flags.log){
    alert({ type: `info`, name: `INFO`, msg: `Printing log of commits in table format...` });
    commands.push(`git log --pretty=oneline -10`);
  }

  let command = commands.join(" && ");
 console.log(command);
  return command;
};

module.exports = commit;
