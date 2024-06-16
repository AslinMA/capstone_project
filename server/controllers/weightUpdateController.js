const db = require('../db');

exports.updateWeightDetails = (req, res) => {
  const { date, route, vehicleNumber, tanks } = req.body;

  if (!date || !route || !vehicleNumber || !Array.isArray(tanks) || tanks.length !== 3) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  const query = `
    INSERT INTO weight_updates (date, route, vehicle_number, tank_number, weight, drc, ammonia, vfa)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const promises = tanks.map((tank, index) => {
    const params = [date, route, vehicleNumber, index + 1, tank.weight, tank.drc, tank.ammonia, tank.vfa];
    return new Promise((resolve, reject) => {
      db.query(query, params, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  });

  Promise.all(promises)
    .then(results => {
      res.json({ message: 'Data saved successfully' });
    })
    .catch(err => {
      console.error('Database insert error:', err);
      res.status(500).json({ error: err.message });
    });
};
