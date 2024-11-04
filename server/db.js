// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'latex-collecting.cv6k2qqyuwkp.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'LatexMnage12',
  database: 'latex_management'
});




db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');

});

module.exports = db;