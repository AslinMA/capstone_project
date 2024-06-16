const bcrypt = require('bcrypt');
const db = require('../db');








exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("This is the user entered email: " + email);
  const sql = 'SELECT * FROM estate_register WHERE email = ?';

  db.query(sql, [email], async (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database query error' });
    }

    if (results.length === 0) {
      console.log("This is the result from the server: " + results);
      return res.status(400).json({ error: 'User not found' });
    }

    const user = results[0];
    try {
      console.log("This is the user-entered password: " + password);
      console.log("This is the server hashed password: " + user.password);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.lxb_no = user.lxb_no; // Set lxb_no in the session
        console.log("This is the lxb_no set in session: " + req.session.lxb_no);
        req.session.save((err) => {
          if (err) {
            console.error('Error saving session:', err);
            return res.status(500).json({ error: 'Error saving session' });
          }
          return  res.status(200).json({ message: 'Login successful', lxb_no: req.session.lxb_no });
        });
      } else {
        console.log("Invalid credentials");
        res.status(400).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      res.status(500).json({ error: 'Error comparing passwords' });
    }
  });
};
