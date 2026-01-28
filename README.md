# TaskMaster Backend API

## Overview

TaskMaster is the core backend system for Productivity Inc.'s flagship productivity suite, handling user accounts, project management, and task operations. This RESTful API serves as the engine powering the entire TaskMaster application.

## Features

### User Management
- User registration and authentication
- Secure password handling
- User profile management
- Session management

### Project Management
- Create, read, update, and delete projects
- Project organization and categorization
- Team collaboration features
- Progress tracking

### Task Management
- Full CRUD operations for tasks
- Task prioritization and status tracking
- Deadline management
- Subtask support
- Assignment to users/projects

## Tech Stack

- **Framework:** Express.js / Fastify / NestJS (choose one)
- **Database:** PostgreSQL / MongoDB
- **Authentication:** JWT / OAuth 2.0
- **Validation:** Joi / Zod
- **Testing:** Jest / Mocha
- **Documentation:** Swagger/OpenAPI

## Installation

```bash
# Clone the repository
git clone https://github.com/productivity-inc/taskmaster-backend.git

# Navigate to project directory
cd taskmaster-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Update .env with your configuration

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h
BCRYPT_SALT_ROUNDS=10
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `DELETE /api/users/me` - Delete user account

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - List all tasks (with filtering)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/subtasks` - Add subtask

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `username` (String)
- `password_hash` (String)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Projects Table
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (Text)
- `owner_id` (UUID, Foreign Key)
- `status` (Enum)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Tasks Table
- `id` (UUID, Primary Key)
- `title` (String)
- `description` (Text)
- `project_id` (UUID, Foreign Key)
- `assignee_id` (UUID, Foreign Key)
- `status` (Enum)
- `priority` (Enum)
- `due_date` (Timestamp)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Development Setup

1. **Prerequisites:**
   - Node.js (v18 or higher)
   - PostgreSQL (v12 or higher) or MongoDB
   - Git

2. **Local Development:**
   ```bash
   # Install dependencies
   npm install
   
   # Run tests
   npm test
   
   # Run in development mode with hot reload
   npm run dev
   
   # Run in production mode
   npm start
   ```

3. **Docker (Optional):**
   ```bash
   docker-compose up -d
   ```

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e
```

## API Documentation

Interactive API documentation is available at `/api-docs` when running the server in development mode.

## Deployment

### Build for Production
```bash
npm run build
```

### Using Docker
```bash
docker build -t taskmaster-backend .
docker run -p 3000:3000 taskmaster-backend
```

## Project Structure

```
taskmaster-backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── validators/
│   └── app.js
├── tests/
├── migrations/
├── seeders/
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Coding Standards

- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation accordingly
- Use async/await for async operations
- Follow RESTful API conventions

## Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens expire after 24 hours
- Input validation on all endpoints
- SQL injection prevention
- Rate limiting on authentication endpoints
- CORS configuration
- Helmet.js for security headers

## Monitoring & Logging

- Structured logging with Winston
- Error tracking integration
- Performance monitoring
- Health check endpoint (`GET /health`)

## License

Proprietary - © 2024 Productivity Inc.

## Support

For technical support or questions:
- Create an issue in the repository
- Email: backend-support@productivity-inc.com
- Slack: #taskmaster-backend channel

---

**Built with love and sweat by Kayla Knight**