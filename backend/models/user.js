const db = require('../db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

/**
 * Create a new user in the database
 */
async function createUser({ name, email, password, role, profileImage }) {
  // Hash password safely before storing
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await db.query(
    `INSERT INTO users (name, email, password_hash, role, profile_image)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, role, profile_image, created_at`,
    [name, email, hashedPassword, role || 'student', profileImage || null]
  );

  return result.rows[0];
}

/**
 * Find a user by email
 */
async function findByEmail(email) {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
}

/**
 * Find a user by id
 */
async function findById(id) {
  const result = await db.query(
    `SELECT id, name, email, role, profile_image, created_at FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

module.exports = { createUser, findByEmail, findById };
