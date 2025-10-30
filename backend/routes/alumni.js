const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middlewares/authMiddleware');


// GET /api/alumni - list alumni (simple demo: join users where role = 'alumni')
router.get('/', async (req,res) => {
  try {
    const q = await db.query("SELECT id, name, email, role, profile_image AS profileImage, created_at FROM users WHERE role IN ('alumni','student','mentor') ORDER BY name ASC");
    res.json(q.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/alumni/:id
router.get('/:id', async (req,res) => {
  try {
    const id = req.params.id;
    const q = await db.query("SELECT id, name, email, role, profile_image AS profileImage, created_at FROM users WHERE id = $1", [id]);
    if (!q.rows.length) return res.status(404).json({ error: 'not found' });
    res.json(q.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
