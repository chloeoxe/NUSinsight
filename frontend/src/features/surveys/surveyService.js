import axios from "axios";

const API_URL = "/api/surveys/";

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
  getSurveys,
  deleteSurvey,
};

export default surveyService;
