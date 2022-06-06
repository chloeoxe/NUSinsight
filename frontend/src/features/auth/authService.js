import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Get user details
const getMe = () => {
  /*
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.get(API_URL + "me");

  return response.data;
  */
  return JSON.parse(localStorage.getItem("user"));
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  getMe,
  logout,
};

export default authService;
