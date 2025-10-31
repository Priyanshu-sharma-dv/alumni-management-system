const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { pool } = require('../db');

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random()*1e9) + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get all resources
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT r.*, u.name as author_name, u.role as author_role
      FROM resources r
      LEFT JOIN users u ON r.author_id = u.id
      ORDER BY r.created_at DESC
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Get resources error:', err);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// Get resource by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT r.*, u.name as author_name, u.role as author_role
      FROM resources r
      LEFT JOIN users u ON r.author_id = u.id
      WHERE r.id = $1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Get resource error:', err);
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
});

// Create new resource
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description, category, type, tags, author_id } = req.body;

    if (!title || !description || !category || !type) {
      return res.status(400).json({ error: 'Title, description, category, and type are required' });
    }

    // Get user ID from auth middleware (assuming it's set)
    const userId = req.user?.id || author_id || 1; // Default to 1 for demo

    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const fileName = req.file ? req.file.originalname : null;
    const fileSize = req.file ? req.file.size : null;

    const query = `
      INSERT INTO resources (title, description, category, type, tags, file_url, file_name, file_size, author_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING *
    `;

    const values = [title, description, category, type, tags, fileUrl, fileName, fileSize, userId];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create resource error:', err);
    res.status(500).json({ error: 'Failed to create resource' });
  }
});

// Download resource file
router.get('/:id/download', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT file_url, file_name FROM resources WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    const resource = result.rows[0];
    if (!resource.file_url) {
      return res.status(404).json({ error: 'No file available for download' });
    }

    const filePath = path.join(__dirname, '..', resource.file_url);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on server' });
    }

    res.download(filePath, resource.file_name);
  } catch (err) {
    console.error('Download resource error:', err);
    res.status(500).json({ error: 'Failed to download resource' });
  }
});

// Bookmark/unbookmark resource
router.post('/:id/bookmark', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    // Check if bookmark exists
    const checkQuery = 'SELECT id FROM bookmarks WHERE user_id = $1 AND resource_id = $2';
    const checkResult = await pool.query(checkQuery, [user_id, id]);

    if (checkResult.rows.length > 0) {
      // Remove bookmark
      await pool.query('DELETE FROM bookmarks WHERE user_id = $1 AND resource_id = $2', [user_id, id]);
      res.json({ bookmarked: false, message: 'Resource unbookmarked' });
    } else {
      // Add bookmark
      await pool.query('INSERT INTO bookmarks (user_id, resource_id, created_at) VALUES ($1, $2, NOW())', [user_id, id]);
      res.json({ bookmarked: true, message: 'Resource bookmarked' });
    }
  } catch (err) {
    console.error('Bookmark resource error:', err);
    res.status(500).json({ error: 'Failed to toggle bookmark' });
  }
});

// Update resource
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, type, tags } = req.body;

    let query = `
      UPDATE resources
      SET title = $1, description = $2, category = $3, type = $4, tags = $5, updated_at = NOW()
    `;
    let values = [title, description, category, type, tags];

    if (req.file) {
      query = query.replace('updated_at = NOW()', 'file_url = $6, file_name = $7, file_size = $8, updated_at = NOW()');
      values.push(`/uploads/${req.file.filename}`, req.file.originalname, req.file.size);
    }

    query += ' WHERE id = $' + (values.length + 1) + ' RETURNING *';
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update resource error:', err);
    res.status(500).json({ error: 'Failed to update resource' });
  }
});

// Delete resource
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM resources WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    console.error('Delete resource error:', err);
    res.status(500).json({ error: 'Failed to delete resource' });
  }
});

module.exports = router;
