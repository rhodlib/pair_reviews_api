//Imports
const mongoose = require("mongoose");

//MongoDB url
const uri = process.env.MONGODB_URI;

//Mongoose connect config
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });

//Mongoose success/error notifications
mongoose.connection.once("open", () => {
  console.log(`Database is connected to`, uri);
});

mongoose.connection.on("error", err => {
  console.log(`Error: ${err}`);
});