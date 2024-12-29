const jwt = require("jsonwebtoken");
const User = require("../Model/user.schema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Access Denied: No Token Provided");
    }

    const decoded = jwt.verify(token, "private-key");
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(404).send("User not found");
    }
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};

const authorizeHR = (req, res, next) => {
  if (req.user.role !== "HR") {
    return res.status(403).send("Access Denied: HRs Only");
  }
  next();
};

const authorizeEmployee = (req, res, next) => {
  if (req.user.role !== "EMPLOYEE") {
    return res.status(403).send("Access Denied: Employees Only");
  }
  next();
};

module.exports = {
  authenticate,
  authorizeHR,
  authorizeEmployee,
};
