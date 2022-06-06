const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/account/:id", protect, getMe);
router.put("/account/update/:id", updateMe);

module.exports = router;
