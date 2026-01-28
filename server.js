require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/api/userRoutes');
const projectRoutes = require('./routes/api/projectRoutes');
const taskRoutes = require('./routes/api/taskRoutes');

const app = express();

connectDB();

app.use(express.json());

// routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// health check endpoint
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// error handling 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
