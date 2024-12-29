const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose.connect(
    "mongodb+srv://rashmikalsariya02:popat@cluster0.tzp0d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connected To The DataBase...");
};

module.exports = dbConnect;
