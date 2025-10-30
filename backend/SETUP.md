# Backend Setup Guide

## Prerequisites

1. **PostgreSQL Database** - Make sure PostgreSQL is installed and running
2. **Node.js** - v14 or higher

## Database Setup

### 1. Create the Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE alumni_db;

# Exit
\q
```

### 2. Set up Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL=postgresql://localhost:5432/alumni_db

# Server Configuration  
PORT=4000

# JWT Configuration
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Uploads Configuration
UPLOAD_DIR=uploads
```

### 3. Run Database Migrations

```bash
# Make sure PostgreSQL is running

# Run the migration
psql -U postgres -d alumni_db -f migrations/init.sql
```

Or using psql:
```bash
psql -U postgres -d alumni_db
\i migrations/init.sql
\q
```

## Installing Dependencies

```bash
npm install
```

## Starting the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:4000`

## Troubleshooting

### Database Connection Issues

If you see `ECONNREFUSED` or database connection errors:

1. Make sure PostgreSQL is running:
   ```bash
   # On Windows
   net start postgresql-x64-<version>
   
   # On Mac/Linux
   sudo service postgresql start
   ```

2. Check your DATABASE_URL in `.env` file
3. Make sure the database `alumni_db` exists

### Database doesn't exist

```bash
psql -U postgres
CREATE DATABASE alumni_db;
\q
```

### "relation users does not exist"

Run the migration:
```bash
psql -U postgres -d alumni_db -f migrations/init.sql
```

### Port Already in Use

Change the PORT in `.env` file or kill the process:
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:4000 | xargs kill
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/alumni` - Get all alumni
- `GET /api/alumni/:id` - Get specific alumni

## Testing the Backend

```bash
# Test server is running
curl http://localhost:4000/

# Test registration
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"alumni"}'

# Test login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

