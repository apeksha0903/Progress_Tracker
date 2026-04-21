const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());



// test route
app.get("/", (req, res) => {
  res.send("Backend + DB connected 🚀");
});

// use routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});