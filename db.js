const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
// const itemsPool = new Pool({
//     user: "postgres",
//     password: "admin1234",
//     host: "localhost",
//     port: 5432,
//     database: "myrecipes",
// });

const itemsPool = new Pool({
    connectionString: process.env.DBConnectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = itemsPool;
