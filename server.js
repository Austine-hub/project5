const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // ✅ ADD THIS
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ✅ CONNECT TO YOUR MYSQL DATABASE
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Anisa@2020*',
  database: 'logindb'
});


db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// ✅ LOGIN ROUTE USING MYSQL
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Search for user in the database
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.send('Something went wrong');
      return;
    }

    if (results.length > 0) {
      // Found a matching user
      res.sendFile(path.join(__dirname, 'public', 'home.html'));
    } else {
      // User not found
      res.send('<h2>Wrong username or password</h2><a href="/login.html">Try again</a>');
    }
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/login.html');
});