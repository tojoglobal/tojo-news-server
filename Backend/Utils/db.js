import mysql from "mysql2/promise";

// // Create a connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tojonews",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// database tojonews_tojonews
// pass e9eFVZA0luLccE?&
// user tojonews_tojonews_new
// db host 107.181.238.60
// DB_PORT = 3306

// Test connection function
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    return false;
  }
}

// Test the connection immediately
testConnection();

export default db;
