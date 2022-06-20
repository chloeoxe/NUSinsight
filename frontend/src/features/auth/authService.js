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

// Update user details
const updateUser = async (userData) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await axios.put(
    API_URL + `account/update/${user._id}`,
    userData
  );

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
  
  const response = await axios.get(API_URL + `account/${userData._id}`);

  return response.data;
  */
  return JSON.parse(localStorage.getItem("user"));
};

// Get another user's details
const getOtherUser = async (username) => {
  const response = await axios.get(API_URL + `account/other/${username}`);

  if (response.data) {
    localStorage.setItem("otherUser", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("otherUser");
};

const authService = {
  register,
  login,
  updateUser,
  getMe,
  getOtherUser,
  logout,
};

export default authService;
