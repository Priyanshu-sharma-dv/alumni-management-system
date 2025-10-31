-- users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  profile_image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- resources
CREATE TABLE IF NOT EXISTS resources (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  tags TEXT,
  file_url TEXT,
  file_name TEXT,
  file_size BIGINT,
  author_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- bookmarks
CREATE TABLE IF NOT EXISTS bookmarks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  resource_id INTEGER REFERENCES resources(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, resource_id)
);
