const db = require('../db');

exports.tappingDetailsShow = (req, res) => {
  const { start, end ,lxb_no } = req.query;
 
  
  if (lxb_no !='null') {
    // return res.status(400).json({ error: 'lxb_no is not set in session' });
    let query = "SELECT * FROM daily_tapping_update WHERE lxb_no = ?";
    let params = [lxb_no];
    console.log("///////////lxb_no for tapping"+lxb_no);
  
  
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
  }
  else {
    console.log("you have no lxb or your not approved customer");
    return res.status(400).json({ error: 'you have no lxb or your not approved customer' });
    
  }

 
};
exports.deleteTappingDetail = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM daily_tapping_update WHERE id = ?";
  const params = [id];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Record deleted successfully' });
  });
};

