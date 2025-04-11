import mysql from "mysql2/promise";

// Create a connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tojonews",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;
