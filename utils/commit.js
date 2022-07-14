const alert = require("cli-alerts");
 const commit = (flags) => {
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

 module.exports = commit;