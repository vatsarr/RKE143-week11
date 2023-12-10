const { Pool } = require("pg");
const itemsPool = new Pool({
    user: "postgres",
    password: "admin1234",
    host: "localhost",
    port: 5432,
    database: "myrecipes",
});

module.exports = itemsPool;
