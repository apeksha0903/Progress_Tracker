const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUserName,
} = require("../controllers/userController");

// Create user
router.post("/", createUser);

// Update username
router.put("/:id", updateUserName);

module.exports = router;