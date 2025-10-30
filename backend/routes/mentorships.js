const express = require('express');
const router = express.Router();

// In-memory store for demo; replace with DB
const mentorships = [];

router.get('/', (req, res) => {
  res.json(mentorships);
});

router.post('/', (req, res) => {
  try {
    const { mentorName, title, expertise, capacity, bio, location, isRemote } = req.body;
    if (!mentorName || !title) {
      return res.status(400).json({ error: 'mentorName and title are required' });
    }
    const id = mentorships.length ? mentorships[mentorships.length - 1].id + 1 : 1;
    const newMentorship = {
      id,
      mentorName,
      title,
      expertise: expertise ? [].concat(expertise) : [],
      capacity: Number(capacity) || 1,
      enrolled: 0,
      bio: bio || '',
      location: location || 'Remote',
      isRemote: isRemote === 'true' || isRemote === true,
      createdAt: new Date().toISOString()
    };
    mentorships.push(newMentorship);
    res.status(201).json(newMentorship);
  } catch (err) {
    console.error('Create mentorship error:', err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;


