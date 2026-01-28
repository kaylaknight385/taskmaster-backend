require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// import routes
const userRoutes = require('./routes/api/userRoutes');
const projectRoutes = require('./routes/api/projectRoutes');
const taskRoutes = require('./routes/api/taskRoutes');

const app = express();

// middleware
app.use(express.json());

// connect to MongoDB
connectDB();

// health check route (no auth required) - place before protected routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// error handling middleware (must be last and have 4 parameters)
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  console.error('Error message:', err.message);
  console.error('Error stack:', err.stack);
  res.status(500).json({ 
    error: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
