const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

module.exports = mongoose.connection;

// const mongoose = require("mongoose");

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks"
//   // ,{
//   // specifies that Mongoose should use the new URL parser when connecting to MongoDB.
//   // useNewUrlParser: true,
//   // enables the use of the MongoDB driver's new unified topology engine for monitoring the server's topology.
//   // useUnifiedTopology: true,
//   // enables the automatic creation of indexes in MongoDB for any defined schema indexes in Mongoose.
//   // useCreateIndex: true,
//   // disables the use of the deprecated findOneAndUpdate() and findOneAndRemove() methods in Mongoose, and instead uses the MongoDB driver's updateOne() and deleteOne() methods.
//   // useFindAndModify: false,
//   //   }
// );

// module.exports = mongoose.connection;
