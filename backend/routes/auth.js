const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { pool } = require('../db');
require('dotenv').config();
const { verifyToken } = require('../middlewares/authMiddleware'); // ✅ imported middleware

const router = express.Router();

// ✅ Upload config
const uploadDir = path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// ✅ REGISTER USER / ADMIN
router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      college_name,
      college_email,
      college_code,
    } = req.body;

    if (!password)
      return res.status(400).json({ error: 'Password is required' });

    // 🔹 Admin registration
    if ((role || '').toLowerCase() === 'admin') {
      if (!college_name || !college_code || !college_email)
        return res.status(400).json({
          error: 'College name, college email, and college code are required for admin registration',
        });

      const adminExists = await pool.query(
        'SELECT 1 FROM users WHERE email = $1',
        [college_email]
      );
      if (adminExists.rows.length > 0)
        return res.status(400).json({ error: 'College email already registered' });

      const hashed = await bcrypt.hash(password, 10);
      const result = await pool.query(
        `INSERT INTO users (name, email, password_hash, role, college_name, college_code)
         VALUES ($1, $2, $3, 'admin', $4, $5)
         RETURNING id, name, email, role, college_name, college_code`,
        [college_name, college_email, hashed, college_name, college_code]
      );

      const user = result.rows[0];
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        message: 'Admin registration successful',
        user,
        token,
      });
    }

    // 🔹 Student / Alumni registration
    if (!name || !email)
      return res.status(400).json({ error: 'Name and email are required' });

    const existing = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0)
      return res.status(400).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const profileImage = req.file ? req.file.filename : null;

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, profile_image)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, role, profile_image`,
      [name, email, hashed, role || 'alumni', profileImage]
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      user,
      token,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userRes.rows.length === 0)
      return res.status(400).json({ error: 'Invalid credentials' });

    const user = userRes.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET CURRENT USER
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET PROFILE
router.get('/me', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, role, profile_image, title, company, location,
              graduation_year, bio, linkedin, website, college_name, college_code
       FROM users WHERE id = $1`,
      [req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'User not found' });
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ UPDATE PROFILE
router.put('/profile', verifyToken, upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email, title, company, location, graduationYear, bio, linkedin, website } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    const result = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           profile_image = COALESCE($3, profile_image),
           title = COALESCE($4, title),
           company = COALESCE($5, company),
           location = COALESCE($6, location),
           graduation_year = COALESCE($7, graduation_year),
           bio = COALESCE($8, bio),
           linkedin = COALESCE($9, linkedin),
           website = COALESCE($10, website)
       WHERE id = $11
       RETURNING *`,
      [name, email, profileImage, title, company, location, graduationYear, bio, linkedin, website, req.user.id]
    );

    res.json({ message: 'Profile updated', user: result.rows[0] });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
