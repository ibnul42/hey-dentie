const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const bodyParser = require("body-parser");
const webhookRoutes = require("./routes/webhookRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("", webhookRoutes);
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Routes
app.get("/test", async (req, res) => {
  res.status(200).json({ message: "Welcome to hey-dentie API" });
});
app.use("", require("./routes/featureRoutes"));
app.use("", require("./routes/authRoutes"));
app.use("", require("./routes/adminRoutes"));
app.use("", require("./routes/emailRoutes"));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
