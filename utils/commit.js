const alert = require("cli-alerts");
const GET_BRANCH = require("./branch");
const fs = require("fs");
const commit = (flags) => {
  let commands = [`git add .`];
  flags.branch = flags.branch || GET_BRANCH();

  // create .gitignore file if it doesn't exist
  if (flags.mkignore) {
    if (!fs.existsSync(".gitignore")) {
      alert({
        type: `info`,
        name: `INFO`,
        msg: `Creating .gitignore file`,
      });

      const template = fs.readFileSync(
        `${__dirname}/../templates/.node.gitignore`,
        "utf8"
      );
      fs.writeFileSync(".gitignore", template);
    }
  } else {
    alert({
      type: `info`,
      name: `INFO`,
      msg: `Not Creating .gitignore file as it already exists`,
    });
  }

  if (flags.message && flags.empty) {
    alert({ type: `info`, name: `INFO`, msg: `Creating empty commit ...` });
    commands.push(`git commit --allow-empty -m "${flags.message}"`);
  } else if (flags.message) {
    alert({ type: `info`, name: `INFO`, msg: `Committing changes ...` });
    commands.push(`git commit -m "${flags.message}"`);
  }

  if (flags.push && flags.upstream) {
    if (flags.force) {
      alert({
        type: `warning`,
        name: `FORCE PUSH`,
        msg: `Force Pushing upstream to remote...`,
      });
      commands.push(`git push -u -f origin ${flags.branch}`);
    } else {
      alert({
        type: `info`,
        name: `INFO`,
        msg: `Pushing upstream to remote...`,
      });
      commands.push(`git push -u origin ${flags.branch}`);
    }
  } else if (flags.push) {
    if (flags.force) {
      alert({
        type: `warning`,
        name: `FORCE PUSH`,
        msg: `Force Pushing to remote...`,
      });
      commands.push(`git push -f origin ${flags.branch}`);
    } else {
      alert({
        type: `info`,
        name: `INFO`,
        msg: `Pushing to remote...`,
      });
      commands.push(`git push origin ${flags.branch}`);
    }
  }
  if (flags.log) {
    alert({
      type: `info`,
      name: `INFO`,
      msg: `Printing log of commits in table format...`,
    });
    commands.push(
      `git log --pretty=format:"%C(magenta) %h %C(cyan)%C(bold)%ad%Creset %<(23) %C(cyan)%cr%Creset %s%C(green)%Creset" --date=short`
    );
  }

  let command = commands.join(" && ");
  return command;
};

module.exports = commit;
