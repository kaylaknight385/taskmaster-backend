const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { generateToken } = require('../../utils/auth');

// @route   POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'user already exists' });
    }

    // create new user (password will be hashed by the pre-save hook)
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'user registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'invalid credentials' });
    }

    // compare password with hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'invalid credentials' });
    }

    // generate token
    const token = generateToken(user._id);

    res.json({
      message: 'login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
