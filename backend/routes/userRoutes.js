const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  getOther,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/account/:id", protect, getMe);
router.put("/account/update/:id", updateMe);
router.get("/account/other/:username", getOther);

module.exports = router;
