import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import surveyService from "./surveyService";

const initialState = {
  surveys: [],
  findings: {},
  isError: false,
  isSuccess: false,
  postSuccess: false,
  postDraftSuccess: false,
  getDraftSuccess: false,
  postFindingsSuccess: false,
  postFavSuccess: false,
  isLoading: false,
  isDraftLoading: false,
  message: "",
};

// Create new survey
export const createSurvey = createAsyncThunk(
  "surveys/create",
  async (surveyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.createSurvey(surveyData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new DRAFT survey
export const createDraftSurvey = createAsyncThunk(
  "surveys/createDraft",
  async (surveyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.createSurvey(surveyData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update draft survey
export const updateDraftSurvey = createAsyncThunk(
  "surveys/updateDraft",
  async (surveyParams, thunkAPI) => {
    try {
      const { surveyId, surveyData } = surveyParams;
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.updateSurvey(surveyId, surveyData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update draft survey to publish
export const updateDraftToPublish = createAsyncThunk(
  "surveys/updateDraftToPublish",
  async (surveyParams, thunkAPI) => {
    try {
      const { surveyId, surveyData } = surveyParams;
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.updateSurvey(surveyId, surveyData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all surveys
export const getAllSurveys = createAsyncThunk(
  "surveys/getAllSurveys",
  async (_, thunkAPI) => {
    try {
      return await surveyService.getAllSurveys();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update draft survey
export const updateFavSurvey = createAsyncThunk(
  "surveys/updateFavSurvey",
  async (surveyParams, thunkAPI) => {
    try {
      const { surveyId, fav } = surveyParams;
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.updateFavSurvey(surveyId, fav, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user surveys
export const getSurveys = createAsyncThunk(
  "surveys/getUserSurveys",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.getSurveys(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get feed surveys
export const getFeedSurveys = createAsyncThunk(
  "surveys/getFeed",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.getFeedSurveys(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get favourited surveys
export const getFavSurveys = createAsyncThunk(
  "surveys/getFavSurveys",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.getFavSurveys(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get another user's surveys
export const getOtherUserSurveys = createAsyncThunk(
  "surveys/getOtherUserSurveys",
  async (username, thunkAPI) => {
    try {
      return await surveyService.getOtherUserSurveys(username);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get survey to complete
export const getSurveyToComplete = createAsyncThunk(
  "surveys/getSurveyToComplete",
  async (surveyId, thunkAPI) => {
    try {
      return await surveyService.getSurveyToComplete(surveyId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user's draft surveys
export const getDraftSurveys = createAsyncThunk(
  "surveys/getDraftSurveys",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.getDraftSurveys(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user's draft surveys by ID
export const getDraftSurveysById = createAsyncThunk(
  "surveys/getDraftSurveysById",
  async (surveyId, thunkAPI) => {
    try {
      return await surveyService.getDraftSurveysById(surveyId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get survey findings
export const getSurveyFindings = createAsyncThunk(
  "surveys/getSurveyFindings",
  async (surveyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.getSurveyFindings(surveyId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Submit survey response
export const submitSurvey = createAsyncThunk(
  "surveys/submit",
  async (surveyData, thunkAPI) => {
    try {
      return await surveyService.submitSurvey(surveyData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user survey
export const deleteSurvey = createAsyncThunk(
  "surveys/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.deleteSurvey(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const surveySlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSurvey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postSuccess = true;
        state.isSuccess = true;
        state.surveys.push(action.payload);
      })
      .addCase(createSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createDraftSurvey.pending, (state) => {
        state.isLoading = true;
        state.isDraftLoading = true;
      })
      .addCase(createDraftSurvey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDraftLoading = false;
        state.postDraftSuccess = true;
        state.isSuccess = true;
        state.surveys.push(action.payload);
      })
      .addCase(createDraftSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.isDraftLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDraftSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDraftSurvey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(updateDraftSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateDraftToPublish.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDraftToPublish.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.postDraftSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(updateDraftToPublish.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllSurveys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSurveys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(getAllSurveys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateFavSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFavSurvey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.postFavSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(updateFavSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSurveys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSurveys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(getSurveys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFeedSurveys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedSurveys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(getFeedSurveys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFavSurveys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavSurveys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(getFavSurveys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOtherUserSurveys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOtherUserSurveys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(getOtherUserSurveys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSurveyToComplete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSurveyToComplete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(getSurveyToComplete.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDraftSurveys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDraftSurveys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(getDraftSurveys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDraftSurveysById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDraftSurveysById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.getDraftSuccess = true;
        state.isSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(getDraftSurveysById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSurveyFindings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSurveyFindings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.postFindingsSuccess = true;
        state.findings = action.payload;
      })
      .addCase(getSurveyFindings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(submitSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitSurvey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = action.payload;
      })
      .addCase(submitSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSurvey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = state.surveys.filter(
          (survey) => survey._id !== action.payload.id
        );
      })
      .addCase(deleteSurvey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = surveySlice.actions;
export default surveySlice.reducer;
