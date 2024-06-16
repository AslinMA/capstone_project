// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'latex_management'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');

});

module.exports = db;
