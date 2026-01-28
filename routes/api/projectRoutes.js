const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const { verifyToken } = require('../../utils/auth');

// all routes are PROTECTED- need to be logged in
router.use(verifyToken);

// @route   POST /api/projects
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    // create project with the logged-in user as owner
    const project = new Project({
      name,
      description,
      owner: req.userId // comes from verifyToken middleware
    });

    await project.save();

    res.status(201).json({
      message: 'project created successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/projects
router.get('/', async (req, res) => {
  try {
    // only find projects where owner matches the logged-in user
    const projects = await Project.find({ owner: req.userId });

    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'project not found' });
    }

    // check if the logged-in user owns this project
    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'not authorized to view this project' });
    }

    res.json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/projects/:id we update here
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'project not found' });
    }

    // check if the logged-in user owns this project
    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'not authorized to update this project' });
    }

    // update fields
    if (name) project.name = name;
    if (description) project.description = description;

    await project.save();

    res.json({
      message: 'project updated successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'project not found' });
    }

    // check if the logged-in user owns this project
    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'not authorized to delete this project' });
    }

    await project.deleteOne();

    res.json({ message: 'project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
