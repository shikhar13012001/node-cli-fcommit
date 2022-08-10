const alert = require("cli-alerts");
const GET_BRANCH = require("./branch");
const commit = (flags) => {
  let commands = [`git add .`];
  flags.branch=flags.branch || GET_BRANCH();
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
    commands.push(`git log --pretty=format:"%C(magenta) %h %C(cyan)%C(bold)%ad%Creset %<(23) %C(cyan)%cr%Creset %s%C(green)%Creset" --date=short`);
  }

  let command = commands.join(" && ");
  return command;
};

module.exports = commit;
