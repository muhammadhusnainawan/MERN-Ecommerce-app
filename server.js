const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const cors = require("cors");
const products = require("./data/products");
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const orderRoutes = require("./routes/orderRoutes");
const path = require("path");
require("colors");

// dotenv config
dotenv.config();
// connecting to MongoDb
connectDb();
//middleware bodyparser
app.use(express.json());

app.use(cors(
  {
    origin:["https://webapp-three-inky.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
  }
));

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Node Server</h1>`);
});
app.use(productsRoutes);
app.use("/users", usersRoutes);
app.use("/orders", orderRoutes);
// middleware configuration
app.use(errorHandler);

const PORT = 8080;

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname,"frontend", "build", "index.html"))
});

app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} Mode on port ${process.env.PORT}`
  );
});
