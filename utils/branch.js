const alert = require("cli-alerts");
const GET_BRANCH = () => {
  const currbranch = require("child_process").execSync(`git branch`);
  //present branch
  if (!currbranch?.toString()?.length) {
    // get branch name from git HEAD file and set it to flags.branch
    alert({
      type: `warning`,
      name: `WARNING`,
      msg: `No branch found. Using master branch.`,
    });
    return "master";
  }
  const Presentbranch = currbranch
    .toString()
    .split("\n")
    .find((branch) => {
      return branch.includes("*");
    })
    .trim()
    .split(" ")[1];
  return Presentbranch;
};

module.exports = GET_BRANCH;
