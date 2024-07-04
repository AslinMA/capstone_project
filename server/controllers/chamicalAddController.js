const db = require('../db');

exports.chamicalAdd = (req, res) => {
  const { liters, date, ammonia, tmtd ,lxb_no } = req.body;

  if (!liters || !date || !ammonia || !tmtd) {
    return res.status(400).send({ error: 'All fields are required' });
  }

 
  console.log("lxb_no retrieved from session:", lxb_no);

// var lxb_no = 'lxb002';
  if (lxb_no !='null') {
    const query = `
    INSERT INTO daily_tapping_update (lxb_no, date, today_tapping, today_nh3_addition, today_tmtd_addition) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [lxb_no, date, liters, ammonia, tmtd], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      alert('Error inserting data');
      return res.status(500).send({ error: 'Database error' });
    }
    console.log('Data inserted:', result);
    res.status(200).send({ success: 'Data inserted successfully' });
  });
  }
  else{
     return res.status(400).json({ error: 'your not registered yet still dont you have a registration number' });
  }

  
};
