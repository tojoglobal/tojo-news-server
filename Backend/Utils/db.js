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

export default db;

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
