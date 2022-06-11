const asyncHandler = require("express-async-handler");
const Survey = require("../models/surveyModel");

// @desc Get surveys
// @route GET /api/surveys
// @access Private
const getSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find({ user: req.user.id });

  res.status(200).json(surveys);
});

// @desc  Set survey
// @route POST /api/surveys
// @access Private
const setSurvey = asyncHandler(async (req, res) => {
  const { title, desc, questions } = req.body;

  if (!title || !desc) {
    res.status(400);
    throw new Error("Please add a title and description");
  }

  if (!questions) {
    res.status(400);
    throw new Error("Please add at least one question");
  }

  // Create new survey
  const survey = await Survey.create({
    user: req.user.id,
    title,
    desc,
    questions,
  });

  if (survey) {
    res.status(201).json({
      _id: survey.id,
      user: survey.user,
      title: survey.title,
      desc: survey.desc,
      questions: survey.questions,
    });
  } else {
    res.status(400);
    throw new Error("Invaslid survey data");
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

module.exports = {
  getSurveys,
  setSurvey,
  updateSurvey,
  deleteSurvey,
};
