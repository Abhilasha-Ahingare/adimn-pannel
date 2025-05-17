require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Authrouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const serviceRouter = require("./router/services-router");
const admin = require("./router/admi-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./Meddileware/error-meddileware");

// Updated CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173", // Your local development
    "https://adimn-pannel.vercel.app", // Your Vercel frontend
    "https://adimn-pannel-dev.onrender.com" // Your Render backend (if needed)
  ],
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(CorsOption));

app.use(express.json());

app.use("/api/auth", Authrouter);
app.use("/api/from", contactRouter);
app.use("/api/data", serviceRouter);
app.use("/api/admin", admin);

app.use(errorMiddleware);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("server is runing", PORT);
  });
});
