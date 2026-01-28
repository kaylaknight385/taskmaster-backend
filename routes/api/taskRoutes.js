const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const Project = require('../../models/Project');
const { verifyToken } = require('../../utils/auth');

router.use(verifyToken);

// @route   POST /api/projects/:projectId/tasks
router.post('/projects/:projectId/tasks', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { projectId } = req.params;

    // check if project exists and user owns it
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'not authorized to add tasks to this project' });
    }

    // create the task
    const task = new Task({
      title,
      description,
      status,
      project: projectId
    });

    await task.save();

    res.status(201).json({
      message: 'task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/projects/:projectId/tasks
router.get('/projects/:projectId/tasks', async (req, res) => {
  try {
    const { projectId } = req.params;

    // check if project exists and user owns it
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'not authorized to view tasks for this project' });
    }

    // get all tasks for this project
    const tasks = await Task.find({ project: projectId });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/tasks/:taskId
router.put('/tasks/:taskId', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { taskId } = req.params;

    // find the task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'task not found' });
    }

    // find the parent project
    const project = await Project.findById(task.project);
    if (!project) {
      return res.status(404).json({ error: 'parent project not found' });
    }

    // check if user owns the parent project
    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'not authorized to update this task' });
    }

    // update the task
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await task.save();

    res.json({
      message: 'task updated successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/tasks/:taskId
router.delete('/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;

    // find the task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'task not found' });
    }

    // find the parent project
    const project = await Project.findById(task.project);
    if (!project) {
      return res.status(404).json({ error: 'parent project not found' });
    }

    // check if user owns the parent project
    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'not authorized to delete this task' });
    }

    await task.deleteOne();

    res.json({ message: 'task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
