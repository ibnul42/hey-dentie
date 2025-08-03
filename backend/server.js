const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const { default: Stripe } = require("stripe");
const webhookRoutes = require("./routes/webhookRoutes");

const app = express();
const corsOptions = {
  origin: [
    "https://heydentie.com",
    "https://www.heydentie.com",
    "http://localhost:5500",
    "http://localhost:5173",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
