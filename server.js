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

// routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// health check route (no auth required)
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
