const mongoose = require("mongoose");
const colors = require("colors")
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, 
    //     {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    //    useCreateIndex: true,
    // }
    );
    console.log(`MongoDB is connected at ${connect.connection.host}`.yellow);
  } catch (error) {
    console.log(`Error is ${error}`.red);
    process.exit(1);
  }
};

module.exports = connectDb;
