import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import surveyService from "./surveyService";

const initialState = {
  surveys: [],
  isError: false,
  isSuccess: false,
  postSuccess: false,
  isLoading: false,
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

// Get user surveys
export const getSurveys = createAsyncThunk(
  "surveys/getAll",
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
