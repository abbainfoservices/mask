const galeva = require("./Galeva");
const source = require("./SourceSchema");
const config = require("./config.json");

async function getTargetSchema() {
  var login = await galeva.login(
    config.target.email,
    config.target.password
  );
  const tables = await source.getTableNames(config.schema);
  var targetSchema = [];

  for (var i = 0; i < tables.length; i++) {
    var smallTable = tables[i];
    var table = smallTable.toUpperCase();
    var header = [];
    header.push(table);
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
    const tableData = slice.data.data;
    var tableArray = new Array();
    var targetRow = new Object();
    var data = [];
    tableArray.push(header);

    for (var j = 1; j < tableData.length; j++) {
      for (var k = 1; k < tableData[j].length; k++) {
        targetRow[tableData[0][k]] = tableData[j][k];
      }
      data.push(JSON.parse(JSON.stringify(targetRow)));
    }
    tableArray.push(data);
    targetSchema.push(tableArray);
  }
  return targetSchema;
}

exports.getSchema = getTargetSchema;

