const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// MYSQL CONNECTION

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   // XAMPP default is empty
  database: "ttc_db"
});

db.connect(err => {
  if (err) {
    console.log("DB Connection Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});


// API ROUTE

app.post('/apply', (req, res) => {
  const { full_name, phone, email, age, trade, message } = req.body;

  if (!full_name || !phone || !trade) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing"
    });
  }

  const sql = `
    INSERT INTO applications
    (full_name, phone, email, age, trade, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql,
    [full_name, phone, email, age, trade, message],
    (err, result) => {
      if (err) {
        console.log("Insert Error:", err);

        return res.status(500).json({
          success: false,
          message: "Database insert failed"
        });
      }

      console.log("Saved to MySQL:", result);

      res.json({
        success: true,
        message: "Application saved successfully"
      });
    }
  );
});


// START SERVER

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});