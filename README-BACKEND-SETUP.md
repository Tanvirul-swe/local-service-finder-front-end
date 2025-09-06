# Backend Setup Guide for MySQL/Node.js Integration

This frontend is now configured to work with your external MySQL/Node.js backend. Follow this guide to set up the backend integration.

## Frontend Configuration

### API Configuration
The frontend is configured to connect to your backend through `src/services/api.ts`:

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-production-api.com/api`

Update the `API_BASE_URL` in `src/services/api.ts` to match your backend URL.

## Backend Requirements

Your Node.js backend should implement the following API endpoints:

### Authentication Endpoints

#### 1. Login - `POST /api/auth/login`
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "user@example.com",
      "userType": "consumer",
      "isEmailVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here" // optional
  }
}
```

**Error Response (400/401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

#### 2. Register - `POST /api/auth/register`
**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "password": "password123",
  "userType": "consumer"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully. Please verify your email.",
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "user@example.com",
      "userType": "consumer",
      "isEmailVerified": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here" // optional - only if auto-login after signup
  }
}
```

#### 3. Get Current User - `GET /api/auth/me`
**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    "userType": "consumer",
    "isEmailVerified": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 4. Logout - `POST /api/auth/logout`
**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### 5. Refresh Token - `POST /api/auth/refresh`
**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token_here"
  }
}
```

## MySQL Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL, -- hashed
  userType ENUM('consumer', 'provider') NOT NULL,
  isEmailVerified BOOLEAN DEFAULT FALSE,
  emailVerificationToken VARCHAR(255),
  passwordResetToken VARCHAR(255),
  passwordResetExpires DATETIME,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Example Indexes
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_userType ON users(userType);
CREATE INDEX idx_users_emailVerificationToken ON users(emailVerificationToken);
CREATE INDEX idx_users_passwordResetToken ON users(passwordResetToken);
```

## Backend Implementation Example (Node.js/Express)

### Dependencies
```json
{
  "express": "^4.18.0",
  "mysql2": "^3.6.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "cors": "^2.8.5",
  "helmet": "^7.0.0",
  "express-rate-limit": "^6.8.0"
}
```

### Basic Server Setup
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Security Best Practices

1. **Password Hashing**: Use bcryptjs with salt rounds >= 12
2. **JWT Secrets**: Use strong, random JWT secrets
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: Implement rate limiting on auth endpoints
5. **Input Validation**: Validate and sanitize all inputs
6. **CORS**: Configure CORS properly for your frontend domain
7. **Environment Variables**: Store sensitive data in environment variables

## Environment Variables

Create a `.env` file in your backend:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=servicehub
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# App
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Email (for verification)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

## Testing the Integration

1. Start your backend server
2. Update `API_BASE_URL` in `src/services/api.ts`
3. Test login/signup functionality in the frontend
4. Check browser network tab for API calls
5. Verify JWT tokens are being stored and sent correctly

## Additional Features to Implement

- Email verification
- Password reset functionality
- User profile updates
- Account deletion
- OAuth integration (Google, Facebook)
- Two-factor authentication

## Troubleshooting

- **CORS Issues**: Make sure your backend allows the frontend origin
- **Token Issues**: Check JWT secret and expiration settings
- **Database Connection**: Verify MySQL connection and credentials
- **API Endpoints**: Ensure all endpoints return the expected JSON structure