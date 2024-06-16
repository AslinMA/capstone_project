const db = require('../db');

exports.getEstateDetails = (req, res) => {
  const { date, route_name } = req.query;

  if (!date || !route_name) {
    return res.status(400).json({ error: 'Missing required parameters: date and route_name' });
  }

  const query = "SELECT * FROM estate_details WHERE date = ? AND route_name = ? AND sign_of_supervisor = '0'";
  const params = [date, route_name];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Query results:", results);
    res.json(results);
  });
};

exports.updateEstateDetails = (req, res) => {
  const rows = req.body;

  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const query = `
    UPDATE estate_details
    SET drc = ?, deduct_drc = ?, vfa = ?, AmmoniaQality = ?
    WHERE id = ?
  `;

  const updates = rows.map(row => [
    row.drc,
    row.deductDrc,
    row.vfa,
    row.ammonia,
    row.id
  ]);

  const promises = updates.map(params => new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  }));

  Promise.all(promises)
    .then(results => {
      res.json({ message: 'Data updated successfully' });
    })
    .catch(err => {
      console.error('Database update error:', err);
      res.status(500).json({ error: err.message });
    });
};
exports.updateRouteDetails = (req, res) => {
  const { date, route, vehicleNumber } = req.query;

  let query = `SELECT * FROM weight_updates WHERE 1=1`;
  const queryParams = [];

  if (date) {
    query += ` AND date = ?`;
    queryParams.push(date);
  }
  if (route) {
    query += ` AND route = ?`;
    queryParams.push(route);
  }
  if (vehicleNumber) {
    query += ` AND vehicle_number = ?`;  // Ensure 'vehicle_number' matches the actual column name
    queryParams.push(vehicleNumber);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching weight updates:', err);
      res.status(500).send('Error fetching weight updates');
      return;
    }
    res.json(results);
  });
};

