const User = require("./Model/user-model");
const service = require("./Model/services-model");
const products = require("./api/products");

const seedDefaultAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@admin.com" });

    if (adminExists) {
      console.log("Default admin already exists");
      return;
    }

    // Create default admin user
    const defaultAdmin = new User({
      username: "Admin",
      email: "admin@admin.com",
      phone: "1234567890",
      password: "Admin1234",
      isAdmin: true,
    });

    await defaultAdmin.save();

    //send api
    await service.insertMany(products);

  } catch (error) {
    console.error("Error seeding default admin:", error);
  }
};

module.exports = seedDefaultAdmin;
