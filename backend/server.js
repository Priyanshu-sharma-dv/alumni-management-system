require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { pool } = require('./db');

// Import route modules
const authRoutes = require('./routes/auth');
const alumniRoutes = require('./routes/alumni');
const studentRoutes = require('./routes/student');
const eventsRoutes = require('./routes/events');
const mentorshipsRoutes = require('./routes/mentorships');
const alumniDashboardRoutes = require('./routes/alumni-dashboard');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving (uploads)
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
// Ensure uploads directory exists
const uploadsPath = path.join(__dirname, uploadDir);
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/mentorships', mentorshipsRoutes);
app.use('/api/alumni-dashboard', alumniDashboardRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: '🎓 Alumni Management API running successfully!', time: new Date() });
});

// Handle invalid API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server after DB connection
const PORT = process.env.PORT || 4000;

pool.connect()
  .then(client => {
    console.log('✅ Connected to PostgreSQL');
    client.release();
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  });
