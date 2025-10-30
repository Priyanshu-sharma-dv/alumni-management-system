# Quick Start Guide

## Starting the Application

### 1. Start the Backend (Terminal 1)
```bash
cd backend
npm install  # if not already done
npm start
```
Backend will run on `http://localhost:4000`

### 2. Start the Frontend (Terminal 2)
```bash
cd frontend
npm install  # if not already done
npm run dev
```
Frontend will run on `http://localhost:4028`

### 3. Access the Application
Open your browser and visit: `http://localhost:4028`

## Testing the Connection

1. **Registration Flow:**
   - Go to `/login-portal`
   - Select a role (Alumni/Student/Admin)
   - Click "Create Account"
   - Fill in the registration form
   - Submit and you'll be redirected to the appropriate dashboard

2. **Login Flow:**
   - Go to `/login-portal`
   - Select a role
   - Enter your credentials
   - You'll be redirected to your dashboard

3. **Alumni Directory:**
   - Go to `/alumni-directory`
   - The page will fetch alumni data from the backend
   - Use filters to search for specific alumni

## Troubleshooting

### Backend Not Running
If you see API errors in the console:
- Make sure the backend is running on port 4000
- Check `backend/server.js` is running without errors

### CORS Issues
The backend already has CORS enabled in `server.js`:
```javascript
app.use(cors());
```

### Port Already in Use
If port 4028 is in use:
- Check `frontend/vite.config.js` to change the port
- Or kill the process using that port

## API Endpoints Used

The frontend connects to these backend endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/alumni` - Get all alumni
- `GET /api/alumni/:id` - Get specific alumni

All requests are automatically proxied through Vite during development.

