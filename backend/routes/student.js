const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Simple in-memory store for demo purposes
const store = {
  opportunities: [
    { id: 1, title: 'Frontend Developer Internship', company: 'TechCorp', location: 'Remote', deadline: '2025-01-30', type: 'internship', description: 'Build UI features with React.', skills: ['React','JS'], duration: '12 weeks', postedBy: 'Recruiting Team', saved: false, applied: false },
    { id: 2, title: 'Data Analyst Trainee', company: 'DataWorks', location: 'Bangalore', deadline: '2025-02-10', type: 'job', description: 'Analyze datasets and build dashboards.', skills: ['SQL','Python'], duration: 'Full-time', postedBy: 'Campus Hiring', saved: true, applied: false }
  ],
  pathwaysProgress: { 1: 45, 2: 20 },
  assessments: [
    { id: 1, title: 'React Fundamentals Quiz', completed: false },
    { id: 2, title: 'Data Structures Test', completed: true, results: { level: 'intermediate', score: 72 }, completedDate: '2025-01-05' }
  ],
  mentors: [
    { id: 1, mentees: 5 },
    { id: 2, mentees: 3 }
  ],
  events: [
    { id: 1, registered: false, attendees: 120, capacity: 200 },
    { id: 2, registered: true, attendees: 80, capacity: 120 }
  ]
};

// Resume upload setup
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random()*1e9) + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET opportunities
router.get('/opportunities', (req, res) => {
  res.json(store.opportunities);
});

// POST opportunities/:id/apply
router.post('/opportunities/:id/apply', (req, res) => {
  const id = Number(req.params.id);
  store.opportunities = store.opportunities.map(o => o.id === id ? { ...o, applied: true } : o);
  res.json({ ok: true });
});

// POST opportunities/:id/save
router.post('/opportunities/:id/save', (req, res) => {
  const id = Number(req.params.id);
  store.opportunities = store.opportunities.map(o => o.id === id ? { ...o, saved: !o.saved } : o);
  res.json({ ok: true });
});

// GET pathways/progress
router.get('/pathways/progress', (req, res) => {
  res.json(store.pathwaysProgress);
});

// POST pathways/:id/progress (increment)
router.post('/pathways/:id/progress', (req, res) => {
  const id = Number(req.params.id);
  const current = store.pathwaysProgress[id] || 0;
  store.pathwaysProgress[id] = Math.min(100, current + 5);
  res.json({ progress: store.pathwaysProgress[id] });
});

// GET assessments
router.get('/assessments', (req, res) => {
  res.json(store.assessments);
});

// POST assessments/:id/start
router.post('/assessments/:id/start', (req, res) => {
  const id = Number(req.params.id);
  store.assessments = store.assessments.map(a => a.id === id ? { ...a, completed: true, results: { level: 'beginner', score: 60 }, completedDate: new Date().toISOString().slice(0,10) } : a);
  res.json({ ok: true });
});

// GET mentors
router.get('/mentors', (req, res) => {
  res.json(store.mentors);
});

// POST mentors/:id/connect
router.post('/mentors/:id/connect', (req, res) => {
  const id = Number(req.params.id);
  store.mentors = store.mentors.map(m => m.id === id ? { ...m, mentees: m.mentees + 1 } : m);
  res.json({ ok: true });
});

// GET events
router.get('/events', (req, res) => {
  res.json(store.events);
});

// POST events/:id/register
router.post('/events/:id/register', (req, res) => {
  const id = Number(req.params.id);
  store.events = store.events.map(e => e.id === id ? { ...e, registered: true, attendees: Math.min(e.capacity, e.attendees + 1) } : e);
  res.json({ ok: true });
});

// POST resume upload
router.post('/resume', upload.single('resume'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;


