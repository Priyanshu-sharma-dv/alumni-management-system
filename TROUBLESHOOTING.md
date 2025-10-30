# Troubleshooting Guide

## Registration Fails - "Server Failed"

When you see "server failed" when clicking "Create Account", check the following:

### 1. Check Backend is Running

```bash
cd backend
npm start
```

You should see: `Server listening on 4000`

### 2. Check Database is Set Up

The most common issue is the database is not configured.

**Step 1: Create PostgreSQL Database**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE alumni_db;

# Exit
\q
```

**Step 2: Run Migration**

```bash
# Navigate to backend directory
cd backend

# Run migration (adjust path as needed)
psql -U postgres -d alumni_db -f migrations/init.sql
```

**Step 3: Create `.env` file**

Create `backend/.env` with:

```env
DATABASE_URL=postgresql://localhost:5432/alumni_db
PORT=4000
JWT_SECRET=your-secret-key-here
UPLOAD_DIR=uploads
```

### 3. Check Browser Console

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Try registration again
4. Look for error messages

Common errors:
- **CORS errors** - Backend not running or CORS not configured
- **Network errors** - Backend not accessible
- **500 errors** - Database not set up
- **400 errors** - Validation errors (check error message)

### 4. Check Backend Console

Look at your backend terminal for error messages:

```
Registration request received
Request body: { name: '...', email: '...' }
```

If you see errors like:
- "connection refused" - PostgreSQL not running
- "relation users does not exist" - Migration not run
- "password_hash" errors - Database schema issue

### 5. Common Fixes

**Fix 1: PostgreSQL Not Running**
```bash
# Start PostgreSQL service
# Windows: Services app → Start PostgreSQL
# Mac: brew services start postgresql
# Linux: sudo service postgresql start
```

**Fix 2: Database Not Created**
```sql
psql -U postgres
CREATE DATABASE alumni_db;
\q
```

**Fix 3: Migration Not Run**
```bash
cd backend
psql -U postgres -d alumni_db -f migrations/init.sql
```

**Fix 4: No .env file**
```bash
cd backend
# Create .env file with DATABASE_URL, JWT_SECRET, etc.
```

**Fix 5: Wrong DATABASE_URL**
Check your `.env` file has correct PostgreSQL connection string:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/alumni_db
```

### 6. Testing the Setup

**Test 1: Backend Server**
```bash
curl http://localhost:4000/
# Should return: {"ok":true,"timestamp":...}
```

**Test 2: Database Connection**
```bash
cd backend
node
> const db = require('./db')
> db.query('SELECT NOW()').then(r => console.log(r.rows))
```

**Test 3: Registration Endpoint**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123","role":"alumni"}'
```

### 7. Still Not Working?

1. Check both frontend and backend console logs
2. Verify database exists: `psql -U postgres -l | grep alumni_db`
3. Verify table exists: `psql -U postgres -d alumni_db -c "\d users"`
4. Check backend is listening: `netstat -an | grep 4000`

### 8. Quick Setup Commands

For a fresh setup:

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Create database
psql -U postgres -c "CREATE DATABASE alumni_db;"

# 3. Run migration  
psql -U postgres -d alumni_db -f migrations/init.sql

# 4. Create .env
echo "DATABASE_URL=postgresql://localhost:5432/alumni_db" > .env
echo "PORT=4000" >> .env
echo "JWT_SECRET=dev-secret" >> .env

# 5. Start backend
npm start

# In another terminal, start frontend
cd ../frontend
npm install
npm run dev
```

