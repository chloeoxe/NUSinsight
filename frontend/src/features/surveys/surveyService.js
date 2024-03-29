import axios from "axios";

const API_URL = "https://nusinsight-api.onrender.com/api/surveys/";

// Create new survey
const createSurvey = async (surveyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, surveyData, config);

  return response.data;
};

// Update survey
const updateSurvey = async (surveyId, surveyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `${surveyId}`, surveyData, config);

  return response.data;
};

// Get all surveys
const getAllSurveys = async () => {
  const response = await axios.get(API_URL + "getAll");

  return response.data;
};

// Update whether survey is favourited
const updateFavSurvey = async (surveyId, fav, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + `updatefav/${surveyId}`,
    { fav },
    config
  );

  return response.data;
};

// Get user surveys
const getSurveys = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get feed surveys
const getFeedSurveys = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "feed", config);

  return response.data;
};

// Get favourited surveys
const getFavSurveys = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "favourites", config);

  return response.data;
};

// Get another user's surveys
const getOtherUserSurveys = async (username) => {
  const response = await axios.get(API_URL + `other/${username}`);

  return response.data;
};

// Get survey to complete
const getSurveyToComplete = async (surveyId) => {
  const response = await axios.get(API_URL + `complete/${surveyId}`);

  return response.data;
};

// Get user's draft/unpublished surveys
const getDraftSurveys = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "draftSurveys", config);

  return response.data;
};

// Get user's draft/unpublished surveys by ID
const getDraftSurveysById = async (surveyId) => {
  const response = await axios.get(API_URL + `draftSurveys/${surveyId}`);

  return response.data;
};

// Get user's survey findings
const getSurveyFindings = async (surveyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `findings/${surveyId}`, config);

  return response.data;
};

// Submit survey response
const submitSurvey = async (surveyData) => {
  const response = await axios.put(
    API_URL + `submit/${surveyData.surveyId}`,
    surveyData
  );

  return response.data;
};

// Delete user survey
const deleteSurvey = async (surveyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + surveyId, config);

  return response.data;
};

const surveyService = {
  createSurvey,
  getAllSurveys,
  getSurveys,
  getFeedSurveys,
  getFavSurveys,
  getOtherUserSurveys,
  getSurveyToComplete,
  getDraftSurveys,
  getDraftSurveysById,
  getSurveyFindings,
  submitSurvey,
  deleteSurvey,
  updateSurvey,
  updateFavSurvey,
};

export default surveyService;
