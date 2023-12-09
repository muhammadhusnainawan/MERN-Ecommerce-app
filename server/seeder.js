const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const connectDb = require("./config/config");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/UserModel");
const Product = require("./models/ProductModel");
const Order = require("./models/OrderModel");

dotenv.config();
connectDb();
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createUser = await User.insertMany(users);
    const adminUser = await createUser[0]._id;
    const sampleData = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });
    console.log("Sample Data:", sampleData);
    await Product.insertMany(sampleData);
    console.log("Data Imported!!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error is ${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error is ${error}`.red.inverse);
    process.exit(1);
  }
};
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
