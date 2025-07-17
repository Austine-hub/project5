const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // change if your MySQL user is different
  password: 'Anisa@2020*',       // change if your MySQL password is not empty
  database: 'loginDB'
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database');
});

// Handle Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('❌ Error during query:', err);
      return res.status(500).send('Internal server error');
    }

    if (results.length > 0) {
      res.send(`🎉 Welcome, ${username}! Login successful.`);
    } else {
      res.send('❌ Incorrect username or password.');
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});




