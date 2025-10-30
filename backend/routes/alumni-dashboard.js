/**
 * 🎓 Alumni Dashboard Route
 * Works with real PostgreSQL data.
 * Ensure your database has the following tables:
 *  users(id, name, email, password, role, title, company, location, graduation_year, bio, linkedin, website, profile_image)
 *  alumni(id, name, title, company, graduation_year, profile_image, created_at)
 *  students(id, name, email, major, year)
 *  events(id, title, description, event_date, location, created_at)
 *  mentorships(id, student_id, mentor_id, topic, message, status, created_at)
 */

const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { verifyToken } = require('../middlewares/authMiddleware');


// ========================================================
// 1️⃣ USER PROFILE (GET) - Get logged-in alumni info
// ========================================================
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, role, profile_image, title, company, location,
              graduation_year, bio, linkedin, website
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: 'User not found' });

    const user = result.rows[0];
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      title: user.title,
      company: user.company,
      location: user.location,
      graduationYear: user.graduation_year,
      bio: user.bio,
      linkedin: user.linkedin,
      website: user.website,
      profileImage: user.profile_image ? `/uploads/${user.profile_image}` : null,
    });
  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});


// ========================================================
// 2️⃣ USER PROFILE (PUT) - Update logged-in alumni info
// ========================================================
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const {
      name, title, company, location, graduationYear,
      bio, linkedin, website
    } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           title = COALESCE($2, title),
           company = COALESCE($3, company),
           location = COALESCE($4, location),
           graduation_year = COALESCE($5, graduation_year),
           bio = COALESCE($6, bio),
           linkedin = COALESCE($7, linkedin),
           website = COALESCE($8, website)
       WHERE id = $9
       RETURNING *`,
      [name, title, company, location, graduationYear, bio, linkedin, website, req.user.id]
    );

    res.json({
      user: result.rows[0],
      message: '✅ Profile updated successfully',
    });
  } catch (error) {
    console.error('❌ Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});


// ========================================================
// 3️⃣ DASHBOARD STATS - Real stats from database
// ========================================================
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const [alumniCount, studentCount, eventCount, mentorshipCount] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM alumni'),
      pool.query('SELECT COUNT(*) FROM students'),
      pool.query('SELECT COUNT(*) FROM events'),
      pool.query('SELECT COUNT(*) FROM mentorships'),
    ]);

    res.json({
      alumniCount: parseInt(alumniCount.rows[0].count),
      studentCount: parseInt(studentCount.rows[0].count),
      eventCount: parseInt(eventCount.rows[0].count),
      mentorshipCount: parseInt(mentorshipCount.rows[0].count),
    });
  } catch (error) {
    console.error('❌ Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});


// ========================================================
// 4️⃣ RECENT ALUMNI LIST
// ========================================================
router.get('/recent-alumni', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, title, company, graduation_year, profile_image
      FROM alumni
      ORDER BY created_at DESC
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching recent alumni:', error);
    res.status(500).json({ error: 'Failed to fetch recent alumni' });
  }
});


// ========================================================
// 5️⃣ MENTORSHIP REQUESTS (linked with students)
// ========================================================
router.get('/mentorship-requests', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
  SELECT 
    m.id,
    u.name AS student_name,
    m.topic,
    m.status,
    m.created_at
  FROM mentorships m
  JOIN students s ON m.student_id = s.id
  JOIN users u ON s.user_id = u.id
  ORDER BY m.created_at DESC
  LIMIT 10
`);


    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching mentorship requests:', error);
    res.status(500).json({ error: 'Failed to fetch mentorship requests' });
  }
});


// ========================================================
// 6️⃣ ACCEPT / DECLINE MENTORSHIP REQUEST
// ========================================================
router.post('/mentorship-requests/:id/respond', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body; // 'accept' or 'decline'

    await pool.query(
      `UPDATE mentorships
       SET status = $1
       WHERE id = $2 AND mentor_id = $3`,
      [response, id, req.user.id]
    );

    res.json({ message: `✅ Mentorship request ${response}ed successfully` });
  } catch (error) {
    console.error('❌ Error responding to mentorship request:', error);
    res.status(500).json({ error: 'Failed to respond to mentorship request' });
  }
});


// ========================================================
// 7️⃣ EVENTS LIST
// ========================================================
router.get('/events', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
  SELECT id, title, description, event_date, created_at
  FROM events
  ORDER BY event_date DESC
`);

    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});


// ========================================================
// 8️⃣ EVENT REGISTRATION (Optional)
// ========================================================
router.post('/events/:id/register', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    // You can later add event_registrations table
    console.log(`User ${req.user.id} registered for event ${id}`);
    res.json({ message: '✅ Registered successfully!' });
  } catch (error) {
    console.error('❌ Error registering for event:', error);
    res.status(500).json({ error: 'Failed to register for event' });
  }
});
// ========================================================
// 🆕 11️⃣ ACTIVITIES (Placeholder)
// ========================================================
router.get('/activities', verifyToken, async (req, res) => {
  try {
    // You can later connect this with "activities" or "logs" table
    const activities = [
      { id: 1, action: 'Attended Alumni Meet 2025', date: '2025-10-10' },
      { id: 2, action: 'Mentored 3 students in AI Pathway', date: '2025-10-15' },
      { id: 3, action: 'Updated Profile', date: '2025-10-20' },
    ];
    res.json(activities);
  } catch (error) {
    console.error('❌ Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});


// ========================================================
// 🆕 12️⃣ DONATIONS (Placeholder for future payments system)
// ========================================================
router.get('/donations', verifyToken, async (req, res) => {
  try {
    // Placeholder — later integrate Razorpay or Stripe API
    const donations = [
      { id: 1, cause: 'Library Renovation', amount: 5000, date: '2025-09-12' },
      { id: 2, cause: 'Scholarship Fund', amount: 10000, date: '2025-09-20' },
    ];
    res.json(donations);
  } catch (error) {
    console.error('❌ Error fetching donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});


// ========================================================
// 🆕 13️⃣ NETWORKING SUGGESTIONS
// ========================================================
router.get('/networking-suggestions', verifyToken, async (req, res) => {
  try {
    // Sample data (replace with SQL JOIN on similar industries)
    const suggestions = [
      { id: 101, name: 'Rahul Verma', title: 'Senior Engineer', company: 'Infosys' },
      { id: 102, name: 'Aditi Mehta', title: 'Data Scientist', company: 'Google' },
      { id: 103, name: 'Rohit Singh', title: 'Product Manager', company: 'TCS' },
    ];
    res.json(suggestions);
  } catch (error) {
    console.error('❌ Error fetching networking suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch networking suggestions' });
  }
});


// ========================================================
// 9️⃣ ACHIEVEMENTS (Future expansion)
// ========================================================
router.get('/achievements', verifyToken, async (req, res) => {
  try {
    // Placeholder — in the future, link to achievements table
    const achievements = {
      earned: [],
      inProgress: [],
      stats: { totalEarned: 0, currentRank: 0, impactScore: 0 },
    };
    res.json(achievements);
  } catch (error) {
    console.error('❌ Error fetching achievements:', error);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});


// ========================================================
// 🔟 QUICK ACTIONS (Frontend shortcuts)
// ========================================================
router.post('/quick-action', verifyToken, async (req, res) => {
  try {
    const { actionId } = req.body;
    let message = '✅ Action completed successfully';

    switch (actionId) {
      case 'update-profile':
        message = 'Redirecting to profile update...';
        break;
      case 'find-alumni':
        message = 'Opening alumni directory...';
        break;
      case 'post-job':
        message = 'Opening job posting form...';
        break;
      case 'make-donation':
        message = 'Opening donation form...';
        break;
    }

    res.json({ message });
  } catch (error) {
    console.error('❌ Error performing quick action:', error);
    res.status(500).json({ error: 'Failed to perform quick action' });
  }
});

module.exports = router;
