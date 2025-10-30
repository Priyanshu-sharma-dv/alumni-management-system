const { Pool } = require('pg');
require('dotenv').config();

console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL); // 👈 Add this line

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function ensureSchema() {
  // Bring existing DB up-to-date with current code expectations
  const statements = [
    // Create users table if missing
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'alumni',
      profile_image TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );`,
    // Add missing columns if table already existed with older schema
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image TEXT;`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'alumni';`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;`,
    // Optional profile details used by profile page
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS title TEXT;`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS company TEXT;`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS location TEXT;`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS graduation_year INTEGER;`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS linkedin TEXT;`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS website TEXT;`,
    // Admin-only fields
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS college_name TEXT;`,
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS college_code TEXT;`,
  ];

  // If an old 'password' column exists and 'password_hash' does not, rename it
  const renamePasswordColumn = `DO $$
  BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='password')
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='password_hash') THEN
      EXECUTE 'ALTER TABLE users RENAME COLUMN password TO password_hash';
    END IF;
  END $$;`;

  const client = await pool.connect();
  try {
    for (const sql of statements) {
      await client.query(sql);
    }
    await client.query(renamePasswordColumn);
    console.log('🛠️  Database schema verified');
  } finally {
    client.release();
  }
}

pool.connect()
  .then(async () => {
    console.log('✅ Connected to PostgreSQL Database');
    await ensureSchema();
  })
  .catch(err => console.error('❌ Database connection error:', err.message));

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
