const express = require("express");
const dbConnect = require("./config/db");
const UserRouter = require("./Routes/user.route");

const app = express();
app.use(express.json());

app.use("/user", UserRouter);

app.use("/", (req, res) => {
  res.send({ msg: "Welcome To The Job Portal..." });
});

app.listen(8090, () => {
  console.log("Server Running On Port 8090...");
  dbConnect();
});
