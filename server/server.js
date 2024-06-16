const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const chamicalAddRoutes = require('./routes/chamicalAddRoutes');
const tappingRouts = require('./routes/tappingDetailsroutes');
const FillingbillRoutes = require('./routes/FillingbillRoutes');
const weightUpdateRoutes = require('./routes/weightUpdateRoutes');
 // Add the new routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Session middleware configuration
app.use(session({
  secret: 'your_secret_key_here', // Replace with a secret key for session management
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
  },
}));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', registerRoutes);
app.use('/api', loginRoutes);
app.use('/api', chamicalAddRoutes);
app.use('/', tappingRouts);
app.use('/api', FillingbillRoutes);
app.use('/api', weightUpdateRoutes); // Use the new routes

// Logging middleware to check session data
app.use((req, res, next) => {
  console.log('Session data:', req.session);
  next();
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
