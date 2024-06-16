const db = require('../db');

exports.chamicalAdd = (req, res) => {
  const { liters, date, ammonia, tmtd ,lxb_no } = req.body;

  if (!liters || !date || !ammonia || !tmtd) {
    return res.status(400).send({ error: 'All fields are required' });
  }

 
  console.log("lxb_no retrieved from session:", lxb_no);

  if (!lxb_no) {
    return res.status(400).send({ error: 'lxb_no is missing from session' });
  }

  const query = `
    INSERT INTO daily_tapping_update (lxb_no, date, today_tapping, today_nh3_addition, today_tmtd_addition) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [lxb_no, date, liters, ammonia, tmtd], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send({ error: 'Database error' });
    }
    console.log('Data inserted:', result);
    res.status(200).send({ success: 'Data inserted successfully' });
  });
};
