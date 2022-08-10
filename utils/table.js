const Table = require("cli-table");

const TableView = (add) => {
  // print logs using cli-table
  var table = new Table({
    head: ["COMMIT HASH", "DATE", "TIME", "MESSAGE"],
    colWidths: [15, 15, 20, 50],
    
    style: {
      head: ["yellow", "bold", "cyan", "green", "bold"],
      border: ["cyan"],
    },

  });

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  // convert add output to array format
  var addArray = add.toString().split("\n");
  // remove first and last element of array

  // loop through addArray and add each element to table
  for (var i = 0; i < addArray.length; i++) {
    var splits = addArray[i].split(" ");
    //remove empty elements from array
    splits = splits.filter(function (e) {
      return e;
    });

    // merge from index 2 to 4 of array to get date and time
    var dateTime = splits.slice(2, 5).join(" ");
    // merge from index 4 to 5 of array to get commit hash

    var messageSplit = splits.slice(5).join(" ");
    // remove from index 2 to end of array
    splits.splice(2);
    // push date and time to array
    splits.push(dateTime);
    // push message to array
    splits.push(messageSplit);
    // push array to table
    table.push(splits);
  }

  console.log(table.toString());
};
module.exports = TableView;
