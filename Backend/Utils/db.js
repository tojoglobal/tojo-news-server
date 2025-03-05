// import mysql from 'mysql2'

// // MySQL database connection configuration
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'tojonews'
//   });

// // Connect to MySQL
// db.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL: ' + err.stack);
//       return;
//     }
//     console.log('Connected to MySQL as id ' + db.threadId);
//   });

// export default db;

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
