const { Router } = require("express");
const {
  signup,
  login,
  postJob,
  reviewJobPost,
  applyJob,
  reviewApplication,
} = require("../controller/user.controller");
const {
  authenticate,
  authorizeHR,
  authorizeEmployee,
} = require("../Middleware/Auth");

const UserRouter = Router();

UserRouter.post("/signup", signup);
UserRouter.post("/login", login);
UserRouter.post("/postJob", authenticate, authorizeHR, postJob);
UserRouter.post("/reviewJobPost", reviewJobPost);
UserRouter.post("/applyForJob", authenticate, authorizeEmployee, applyJob);
UserRouter.get("/review", reviewApplication);

module.exports = UserRouter;
