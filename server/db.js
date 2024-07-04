// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'latex-collecting.cv6k2qqyuwkp.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'LatexMnage12',
  database: 'latex_management'
});


// const pool = mysql.createPool({
//   host: 'latex-collecting.cv6k2qqyuwkp.ap-southeast-2.rds.amazonaws.com',
//   user: 'admin',
//   password: 'LatexMnage12',
//   database: 'latex_management',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// })

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');

});

module.exports = db;