const Pool = require("pg").Pool;
const pool = new Pool({
  user: "galeva",
  host: "localhost",
  database: "clientdb",
  password: "password",
  port: 5432
});

async function getTableNames2(request, response) {
  const schema = request.params.schema;
  try {
    const results = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema=$1 AND table_type='BASE TABLE'",
      [schema]
    );
    response.status(200).json(results.rows);
  } catch (err) {
    console.log(err.stack);
  }
}

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

async function getSchemaData(schema) {
  try {
    const tables = await getTableNames(schema);
    var data = [];
    for (var i = 0; i < tables.length; i++) {
      const keyColumn = await pool.query(
        "SELECT c.column_name FROM information_schema.key_column_usage AS c LEFT JOIN information_schema.table_constraints AS t ON t.constraint_name = c.constraint_name WHERE t.table_name = $1 AND t.constraint_type = 'PRIMARY KEY';",
        [tables[i]]
      );
      data.push(keyColumn.rows);
      var select = "SELECT * FROM ";
      var query = select.concat(tables[i]);
      const result = await pool.query(query);
      data.push(result.rows);
    }
    return data;
  } catch (err) {
    return err.stack;
  }
}

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getSchemaData,
  getTableNames,
  getTableNames2,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
