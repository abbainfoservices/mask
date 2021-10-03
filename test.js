const db = require("./queries");
const galeva = require("./Galeva");
const thisBackup = require("./backup1.json");

async function getSourceSchema() {
  const sourceSchema = await db.getSchemaData(thisBackup.schema);
  console.log(sourceSchema);
  var newSchema = [];
  for (var i = 0; i < sourceSchema.length; i++) {
    var newTable = [];
    for (var j = 0; j < sourceSchema[i].length; j++) {
      var newRow = {};
      for (var [key, value] of Object.entries(sourceSchema[i][j])) {
        key = key.toUpperCase();
        newRow[key] = value;
      }
      newTable.push(newRow);
    }
    newSchema.push(newTable);
  }

  console.log(newSchema);
}

async function getTargetSchema() {
  var login = await galeva.login(
    thisBackup.login.email,
    thisBackup.login.password
  );
  console.log(login.data.message);
  const tables = await db.getTableNames(thisBackup.schema);
  var targetSchema = [];

  for (var i = 0; i < tables.length; i++) {
    var smallTable = tables[i];
    var table = smallTable.toUpperCase();

    sliceBody = {
      attributes: {
        [table]: ["*"]
      },
      filters: {
        [table]: {}
      },
      join: [],
      rowcount: 999999999999999999999
    };

    const slice = await galeva.slice(login.data.accesstoken, sliceBody);
    console.log(slice.data.data)
    const tableData = slice.data.data;
    var tableArray = new Array();
    var targetRow = new Object();

    for (var j = 1; j < tableData.length; j++) {
      for (var k = 1; k < tableData[j].length; k++) {
        targetRow[tableData[0][k]] = tableData[j][k];
      }
      tableArray.push(JSON.parse(JSON.stringify(targetRow)));
    }

    targetSchema.push(tableArray);
  }

  console.log(targetSchema);
}

async function test() {
  await getSourceSchema();
  await getTargetSchema();
}

test();
