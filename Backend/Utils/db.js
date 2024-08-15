import mysql from 'mysql2'

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tojonews_tojonews',
    password: '3hA?2*zx~zpP',
    database: 'tojonews_tojonews'
  });

// Connect to MySQL
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
  });

export default db;