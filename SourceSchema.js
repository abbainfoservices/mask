const config = require("./config.json");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: config.source.user,
  host: config.source.host,
  database: config.source.database,
  password: config.source.password,
  port: config.source.port
});

async function getTableNames(schema) {
  try {
    const result = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema=$1 AND table_type='BASE TABLE'",
      [schema]
    );
    var tables = [];
    for (var i = 0; i < result.rows.length; i++) {
      tables.push(result.rows[i].table_name);
    }
    return tables;
  } catch (err) {
    console.log(err.stack);
  }
}

async function getSchemaData() {
  try {
    const tableNames = await getTableNames(config.schema);
    var schema = [];
    for (var i = 0; i < tableNames.length; i++) {
      var header = [];
      var table = [];
      header.push(tableNames[i]);
      const keyColumn = await pool.query(
        "SELECT c.column_name FROM information_schema.key_column_usage AS c LEFT JOIN information_schema.table_constraints AS t ON t.constraint_name = c.constraint_name WHERE t.table_name = $1 AND t.constraint_type = 'PRIMARY KEY';",
        [tableNames[i]]
      );
      header.push(keyColumn.rows);
      var select = "SELECT * FROM ";
      var query = select.concat(tableNames[i]);
      const result = await pool.query(query);
      table.push(header);
      table.push(result.rows);
      schema.push(table);
    }
    return schema;
  } catch (err) {
    return err.stack;
  }
}

async function convertSchema() {
  const sourceSchema = await getSchemaData(config.schema);
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
  return newSchema;
}

exports.getSchema = getSchemaData;
exports.getTableNames = getTableNames;
