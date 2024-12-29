const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const User = require("../Model/user.schema");
const Job = require("../Model/job.schema");
const Application = require("../Model/application.schema");
const sendEmail = require("../service/Mailer");

const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, "private-key", {
      expiresIn: "1d",
    });

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const postJob = async (req, res) => {
  try {
    const { title, description } = req.body;
    const job = new Job({
      title,
      description,
      hrId: req.user._id,
      status: "Pending",
    });
    await job.save();
    res.status(201).send("Job posted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const reviewJobPost = async (req, res) => {
  try {
    const { jobId, status } = req.body;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send("Job not found");
    }
    job.status = status;
    await job.save();
    res.status(200).send(`Job ${status.toLowerCase()} successfully`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const applyJob = async (req, res) => {
  try {
    const { jobId, employeeId } = req.body;
    const application = new Application({
      jobId,
      employeeId,
      status: "Pending",
    });
    await application.save();
    res.status(201).send("Application submitted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const reviewApplication = async (req, res) => {
  try {
    const { applicationId, status } = req.body;
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).send("Application not found");
    }
    application.status = status;
    await application.save();

    const user = await User.findById(application.employeeId);
    await sendEmail(
      user.email,
      `Job Application ${status}`,
      `Your application has been ${status.toLowerCase()}.`
    );

    res.status(200).send(`Application ${status.toLowerCase()} successfully`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  login,
  signup,
  postJob,
  reviewJobPost,
  applyJob,
  reviewApplication,
};
