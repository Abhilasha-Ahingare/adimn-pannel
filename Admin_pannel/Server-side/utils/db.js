const mongoose = require("mongoose");
const seedDefaultAdmin = require("../seeder");

const URL = process.env.MONOGDB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("connection successful to DB");
    
    // Seed default admin after successful connection
    await seedDefaultAdmin();
  } catch (error) {
    console.error("database connection failed");
    process.exit(0);
  }
};

module.exports = connectDB;