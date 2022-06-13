const asyncHandler = require("express-async-handler");
const Survey = require("../models/surveyModel");

// @desc Get surveys
// @route GET /api/surveys
// @access Private
const getSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find({ user: req.user.id });

  res.status(200).json(surveys);
});

// @desc  Create survey
// @route POST /api/surveys
// @access Private
const setSurvey = asyncHandler(async (req, res) => {
  const { title, desc, isPublished } = req.body;

  if (!title || !desc) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if a survey with the same title is already created by user
  const sameTitleSurveys = await Survey.find({
    user: req.user.id,
    title: title,
  });
  if (sameTitleSurveys.length !== 0) {
    res.status(400);
    throw new Error("A survey with this title has already been created by you");
  }

  // Create new survey
  const survey = await Survey.create({
    user: req.user.id,
    username: req.user.username,
    title,
    desc,
    isPublished,
  });

  if (survey) {
    res.status(201).json({
      _id: survey.id,
      user: survey.user,
      username: survey.username,
      title: survey.title,
      desc: survey.desc,
      isPublished: survey.isPublished,
    });
  } else {
    res.status(400);
    throw new Error("Invalid survey data");
  }
});

// @desc Update survey
// @route PUT /api/surveys/:id
// @access Private
const updateSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (!survey) {
    res.status(400);
    throw new Error("Survey not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged-in user matches the survey user
  if (survey.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  const updatedSurvey = await Survey.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedSurvey);
});

// @desc Delete survey
// @route DELETE /api/surveys/:id
// @access Private
const deleteSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (!survey) {
    res.status(400);
    throw new Error("Survey not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged-in user matches the survey user
  if (survey.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  await survey.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc Get feed surveys
// @route GET /api/surveys/feed
// @access Private
const getFeedSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find({
    user: { $ne: req.user.id },
    isPublished: true,
  });

  res.status(200).json(surveys);
});

// @desc Get another user's surveys
// @route GET /api/surveys/other/:username
// @access Public
const getOtherUserSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find({
    username: req.params.username,
    isPublished: true,
  });

  res.status(200).json(surveys);
});

module.exports = {
  getSurveys,
  setSurvey,
  updateSurvey,
  deleteSurvey,
  getFeedSurveys,
  getOtherUserSurveys,
};
