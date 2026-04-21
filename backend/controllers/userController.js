const User = require("../models/User");

// @desc Create new user
// @route POST /api/users
const createUser = async (req, res) => {
  try {
    const { user_name } = req.body;

    if (!user_name) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.create({ user_name });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update username
// @route PUT /api/users/:id
const updateUserName = async (req, res) => {
  try {
    const { user_name } = req.body;

    if (!user_name) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { user_name },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  updateUserName,
};