const asyncHandler = require("express-async-handler");
const Survey = require("../models/surveyModel");

// @desc Get all surveys
// @route GET /api/surveys/getAll
// @access Public
const getAllSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find({});

  res.status(200).json(surveys);
});

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
  const { title, desc, questions, answers, isPublished, isFavourite } =
    req.body;

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
    answers,
    isPublished,
    isFavourite,
  });

  if (survey) {
    res.status(201).json({
      _id: survey.id,
      user: survey.user,
      username: survey.username,
      title: survey.title,
      desc: survey.desc,
      questions: survey.questions,
      answers: survey.answers,
      isPublished: survey.isPublished,
      isFavourite: survey.isFavourite,
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

// @desc Update survey's isFavourite boolean
// @route PUT /api/surveys/updatefav/:id
// @access Private
const updateFavSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);
  const { fav } = req.body;

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
    { isFavourite: fav },
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
  const { userId, surveyId, title, desc, questions, answers, isPublished } =
    req.body;

  const survey = await Survey.findById(surveyId);

  if (!survey) {
    res.status(400);
    throw new Error("Survey not found");
  }

  const newAnswers = {
    ...answers,
    submittedAt: new Date(Date.now()),
  };

  const newSurvey = { ...survey }._doc;

  if (survey.answers.hasOwnProperty(userId)) {
    let userAnswers = newSurvey.answers[userId];
    const numUserAnswers = Object.keys(userAnswers).length;
    userAnswers[numUserAnswers + 1] = newAnswers;
  } else {
    newSurvey.answers[userId] = {};
    let userAnswers = newSurvey.answers[userId];
    userAnswers[1] = newAnswers;
  }

  const updatedSurvey = await Survey.findByIdAndUpdate(
    surveyId,
    { answers: newSurvey.answers },
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

// @desc Get favourited surveys
// @route GET /api/surveys/favourites
// @access Private
const getFavSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find({
    user: req.user.id,
    isFavourite: true,
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
    isPublished: true,
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

// @desc Get survey findings
// @route GET /api/surveys/findings/:id
// @access Private

const getSurveyFindings = asyncHandler(async (req, res) => {
  const survey = await Survey.findOne({
    _id: req.params.id,
    isPublished: true,
  });

  const { questions, answers } = survey;

  const findings = {};

  //To initialise 'findings' object with the survey qns
  for (let i = 1; i <= questions.length; i++) {
    let qn = questions[i - 1];
    findings[i] = {};
    if (qn.type === "mcq") {
      let qnOptions = qn.response.options;
      for (let o = 1; o <= qnOptions.length; o++) {
        findings[i][o] = {
          value: qnOptions[o - 1].value,
          num: 0,
          percentage: 0,
        };
      }
    } else if (qn.type === "oe") {
      findings[i]["ans"] = [];
    }
  }

  //To find the total number of survey responses
  let numResponses = 0;
  const userAnsArray = Object.entries(answers);
  for (const [userId, ansObj] of userAnsArray) {
    if (userId === "user") {
      continue;
    }
    numResponses += Object.keys(ansObj).length;
  }

  //To fill up the initialised 'findings' objects with answers data
  for (const user in answers) {
    if (user === "user") {
      continue;
    }
    let userObj = answers[user];
    for (const ans in userObj) {
      let ansObj = userObj[ans];
      let qnAnsArray = Object.entries(ansObj);
      for (const [qnNum, qnAns] of qnAnsArray) {
        if (qnNum === "submittedAt") {
          continue;
        }
        let qn = questions[qnNum - 1];
        if (qn.type === "mcq") {
          for (const op of qnAns) {
            let newOpNum = findings[qnNum][op].num + 1;
            let newOpPercentage = (newOpNum / numResponses) * 100;
            findings[qnNum][op].num = newOpNum;
            findings[qnNum][op].percentage = newOpPercentage;
          }
        } else if (qn.type === "oe") {
          let newOEAns = [...findings[qnNum].ans, qnAns[0]];
          findings[qnNum].ans = newOEAns;
        }
      }
    }
  }

  if (Object.entries(findings).length > 0) {
    res.status(200).json(findings);
  } else {
    res.status(400);
    throw new Error("Survey findings not complete");
  }
});

module.exports = {
  getAllSurveys,
  getSurveys,
  setSurvey,
  updateSurvey,
  updateFavSurvey,
  submitSurvey,
  deleteSurvey,
  getFeedSurveys,
  getFavSurveys,
  getOtherUserSurveys,
  getSurveyToComplete,
  getDraftSurveys,
  getDraftSurveysById,
  getSurveyFindings,
};
