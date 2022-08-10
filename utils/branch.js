const GET_BRANCH=()=>{
     const currbranch = require("child_process").execSync(`git branch`);
     //present branch
     const Presentbranch = currbranch
       .toString()
       .split("\n")
       .find((branch) => {
         return branch.includes("*");
       })
       .trim()
       .split(" ")[1];
        return Presentbranch;
}

module.exports=GET_BRANCH;