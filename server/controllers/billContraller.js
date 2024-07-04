const db = require('../db');

exports.billDetailsShow = (req, res) => {

  const { start, end, lxb_no } = req.query;

  if (lxb_no !='null') {
    // if approve supervisrer this will be =1 if its not defult value is=0
    let query = "SELECT * FROM estate_details WHERE lxb_no = ? AND sign_of_supervisor = '1'";

    let params = [lxb_no];

    if (start && end) {
      query += " AND date BETWEEN ? AND ?";
      params.push(start, end);
    }

    console.log("Executing query:", query, "with params:", params);

    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Query results:", results);
      res.json(results);
    });
  } else {
    console.log("You have no lxb or you are not an approved customer");
    return res.status(400).json({ error: 'You have no lxb or you are not an approved customer' });
  }
};
