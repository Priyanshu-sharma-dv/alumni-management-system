const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random()*1e9) + path.extname(file.originalname))
});
const upload = multer({ storage });

// In-memory store for demo; replace with DB
const events = [];

router.get('/', (req, res) => {
  res.json(events);
});

router.post('/', upload.single('banner'), (req, res) => {
  try {
    const { title, type, date, location, isVirtual, capacity, price, description } = req.body;
    if (!title || !date || !location) {
      return res.status(400).json({ error: 'title, date, and location are required' });
    }
    const id = events.length ? events[events.length - 1].id + 1 : 1;
    const bannerUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const newEvent = {
      id,
      title,
      type: type || 'networking',
      date,
      location,
      isVirtual: isVirtual === 'true' || isVirtual === true,
      capacity: Number(capacity) || 100,
      attendees: 0,
      price: Number(price) || 0,
      description: description || '',
      bannerUrl,
      createdAt: new Date().toISOString()
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;


