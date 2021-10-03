const source = require("./SourceSchema");
const target = require("./TargetSchema");
const galeva = require("./Galeva");

//if row exists in target, check the values. if different, update target. if row doesn't exist, create in target
async function backupPlan() {
  const sourceSchema = await source.getSchema();
  const targetSchema = await target.getSchema();
  var backupPlan = [];
  //check each table
  loopi: for (var i = 0; i < sourceSchema.length; i++) {
    const sourceHeader = sourceSchema[i][0];
    const key = sourceHeader[1][0].column_name;
    const sourceTableName = sourceHeader[0];
    const sourceTableData = sourceSchema[i][1];

    const targetHeader = targetSchema[i][0];
    const targetTableName = targetHeader[0];
    const targetTableData = targetSchema[i][1];

    var result = "";
    var rowExists = false;

    if (sourceTableName.toUpperCase() == targetTableName) {
      //for each row in source table
      loopj: for (var j = 0; j < sourceTableData.length; j++) {
        var update = {};
        var create = {};
        rowExists = false;
        const sourceRow = sourceTableData[j];
        const sourceId = sourceRow[key];

        //check each row in target table
        loopk: for (var k = 0; k < targetTableData.length; k++) {
          const targetRow = targetTableData[k];
          const targetId = targetRow[key.toUpperCase()];
          
          console.log(key)
          if (sourceId == targetId) {
            rowExists = true;

            //check each value in object
            loopl: for (const key in sourceRow) {
              let sourceValue = JSON.stringify(sourceRow[key]);
              let targetValue = JSON.stringify(targetRow[key.toUpperCase()]);

              //if different values, update values in target
              if (sourceValue == targetValue) {
              } else {
                update["operation"] = "update";
                update["table"] = sourceTableName;
                update["row"] = sourceRow;
                backupPlan.push(update);
                //push(["update", sourceTableName, sourceRow]);
                continue loopk;
              }
            }
          }
        }
        //if row doesn't exist in target, create it
        if (rowExists == false) {
          create["operation"] = "create";
          create["table"] = sourceTableName;
          create["row"] = sourceRow;
          backupPlan.push(create);
        }
      }
    }
  }
  return backupPlan;
}

exports.get = backupPlan;