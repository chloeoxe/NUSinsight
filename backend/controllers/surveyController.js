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
  const { title, desc, questions, isPublished } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please add a title");
  }

  if (!questions) {
    res.status(400);
    throw new Error("Please add at least one question");
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
    questions,
    isPublished,
  });

  if (survey) {
    res.status(201).json({
      _id: survey.id,
      user: survey.user,
      username: survey.username,
      title: survey.title,
      desc: survey.desc,
      questions: survey.questions,
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

// @desc  Submit survey response
// @route PUT /api/surveys/submit
// @access Public
const submitSurvey = asyncHandler(async (req, res) => {
  const { _id, title, desc, questions, isPublished } = req.body;

  const survey = await Survey.findById(_id);

  if (!survey) {
    res.status(400);
    throw new Error("Survey not found");
  }

  const updatedSurvey = await Survey.findByIdAndUpdate(
    _id,
    { questions: questions },
    {
      new: true,
    }
  );

  if (updatedSurvey) {
    res.status(200).json(updatedSurvey);
  } else {
    res.status(400);
    throw new Error("Failed to submit survey");
  }
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

// @desc Get survey to complete
// @route GET /api/surveys/complete/:id
// @access Public
const getSurveyToComplete = asyncHandler(async (req, res) => {
  const survey = await Survey.find({
    _id: req.params.id,
  });

  if (survey) {
    res.status(200).json(survey);
  } else {
    res.status(400);
    throw new Error("Survey to complete not found");
  }
});

// @desc Get user's draft surveys
// @route GET /api/surveys/draftSurveys
// @access Private
const getDraftSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find({ user: req.user.id, isPublished: false });

  res.status(200).json(surveys);
});

// @desc Get user's draft surveys by ID
// @route GET /api/surveys/draftSurveys/:id
// @access Public
const getDraftSurveysById = asyncHandler(async (req, res) => {
  const survey = await Survey.find({ _id: req.params.id, isPublished: false });

  if (survey) {
    res.status(200).json(survey);
  } else {
    res.status(400);
    throw new Error("Draft survey not found");
  }
});

module.exports = {
  getSurveys,
  setSurvey,
  updateSurvey,
  submitSurvey,
  deleteSurvey,
  getFeedSurveys,
  getOtherUserSurveys,
  getSurveyToComplete,
  getDraftSurveys,
  getDraftSurveysById,
};
