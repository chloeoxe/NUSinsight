const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, position, major, email, username, password } = req.body;

  if (!name || !position || !major || !email || !username || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  let userExists = "";
  // Check if user email exists
  const userEmailExists = await User.findOne({ email });

  if (userEmailExists) {
    userExists += "This email is already registered as a user.";
  }

  // Check if username exists
  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    userExists += " This username is already being used.";
  }

  // Handle userExists error
  if (userExists) {
    res.status(400);
    throw new Error(userExists);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    position,
    major,
    email,
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      position: user.position,
      major: user.major,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate/login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      position: user.position,
      major: user.major,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get user data
// @route GET /api/users/account/:id
// @access Private
const getMe = asyncHandler(async (req, res) => {
  // Make sure the logged-in user matches the user in the URL
  if (req.params.id !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  res.status(200).json(req.user);
});

// @desc Update user data
// @route PUT /api/users/account/update/:id
// @access Private
const updateMe = asyncHandler(async (req, res) => {
  /*
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged-in user matches the user in the URL
  if (req.params.id !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }
  */
  const updatedMe = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (updatedMe) {
    res.status(201).json({
      _id: updatedMe.id,
      name: updatedMe.name,
      position: updatedMe.position,
      major: updatedMe.major,
      email: updatedMe.email,
      username: updatedMe.username,
      token: generateToken(updatedMe._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Get another user's data
// @route GET /api/users/account/other/:username
// @access Public
const getOther = asyncHandler(async (req, res) => {
  const otherUser = await User.findOne({ username: req.params.username });
  res.status(200).json({
    _id: otherUser.id,
    name: otherUser.name,
    position: otherUser.position,
    major: otherUser.major,
    email: otherUser.email,
    username: otherUser.username,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  getOther,
};
