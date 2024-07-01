const bcrypt = require("bcrypt");
const db = require("../db");

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("User entered email:", email);
  const sql = "SELECT * FROM estate_register WHERE email = ?";

  db.query(sql, [email], async (error, results) => {
    console.log("aaaaaaaaaa");
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Database query error" });
    }

    console.log("Database query results:", results);
    if (results.length === 0) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }

    const user = results[0];
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.lxb_no = user.lxb_no; // Set lxb_no in the session
        req.session.save((err) => {
          if (err) {
            console.error("Error saving session:", err);
            return res.status(500).json({ error: "Error saving session" });
          }
          console.log("Login successful, session lxb_no:", req.session.lxb_no);
          return res.status(200).json({
            message: "Login successful",
            lxb_no: req.session.lxb_no,
          });
        });
      } else {
        console.log("Invalid credentials");
        return res.status(400).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return res.status(500).json({ error: "Error comparing passwords" });
    }
  });
};
