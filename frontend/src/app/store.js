import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import surveyReducer from "../features/surveys/surveySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    surveys: surveyReducer,
  },
});
