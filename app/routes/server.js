const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('user.db', (err) => {
  if (err) {
    console.error('Error opening the database:', err.message);
  } else {
    console.log('Database connection opened.');
  }
});

app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

// Create a table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS user_details (
      id INTEGER PRIMARY KEY,
      username VARCHAR(230)
    );
  `);
});

// Endpoint to handle form submissions
app.post('/submit', async (req, res) => {
      const { username } = req.body;
      const insertQuery = `
        INSERT INTO user_details (username)  
        VALUES ('${username}');
      `;

      try{
        await db.run(insertQuery);
        res.send("Form submitted successfully");
      } catch (error) {
        res.send("Error submitting form");
      }
});

app.get('/user-names', async (req, res) => {
    const getQuery = `SELECT * FROM user_details`;
    try {
      const users = await db.all(getQuery);
      res.send(users);
    } catch (error) {
      res.send("Error Getting User Details");
    }   
});

