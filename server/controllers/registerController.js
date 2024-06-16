// controllers/registerController.js
const bcrypt = require('bcrypt');
const db = require('../db'); // Import the db connection from a separate file
const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 }, // 3MB file size limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([
  { name: 'landRegistrationPDF', maxCount: 1 },
  { name: 'rubberRegistrationPDF', maxCount: 1 },
  { name: 'landIDFront', maxCount: 1 },
  { name: 'landIDBack', maxCount: 1 },
  { name: 'handOverLetter', maxCount: 1 },
  { name: 'userIDFront', maxCount: 1 },
  { name: 'userIDBack', maxCount: 1 }
]);

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images and PDFs only!');
  }
}

exports.registerUser = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error during file upload:', err);
      return res.status(400).json({ error: err });
    }

    const formData = req.body;
    const files = req.files;

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const sql = `INSERT INTO estate_register 
      (full_name, email, land_owner_name, location, land_r_no, land_r_copy, user_id, user_id_front, user_id_back, owner_trance_letter, lxb_no, user_name, password, status, estate_name, route) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        formData.fullName,
        formData.email,
        formData.landOwnerName,
        formData.landLocation,
        formData.landRegistrationNumber,
        files.landRegistrationPDF[0].path,
        formData.userId,
        files.userIDFront ? files.userIDFront[0].path : null,
        files.userIDBack ? files.userIDBack[0].path : null,
        files.handOverLetter ? files.handOverLetter[0].path : null,
        formData.lxbNo,
        formData.userName,
        hashedPassword,
        formData.status,
        formData.estate_name,
        formData.route,
      ];

      console.log('SQL Query:', sql);
      console.log('Query Values:', values);

      db.query(sql, values, (error, results) => {
        if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ error: 'Database query error' });
        }
        res.status(200).json({ message: 'User registered successfully', userId: results.insertId });
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      return res.status(500).json({ error: 'Error hashing password' });
    }
  });
};
