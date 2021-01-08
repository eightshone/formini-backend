const express = require("express");
const Course = require("../models/Course");
const auth = require("../middleware/auth");
const moment = require("moment");
const User = require("../models/User");

const router = express.Router();

router.get("/courses", async (req, res) => {
  try {
    // list all white tests
    const courses = await Course.find()
      .populate("instructors", "name last_name")
      .populate("participants", "name last_name");
    console.log(courses);
    res.status(200).send({ data: { courses } });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/courses/:name", async (req, res) => {
  try {
    // list all white tests
    const courses = await Course.find()
      .populate("instructors", "name last_name")
      .populate("participants", "name last_name");
    console.log(courses);
    res.status(200).send({ data: { courses } });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/courses", auth, async (req, res) => {
  // check for admin role
  if (!req.role || req.role !== "admin") {
    res.status(403).send({ error: "Forbidden" });
    return;
  }

  const data = req.body;
  // Check for a body
  if (!data || data === {}) {
    res.status(400).send({ error: "Bad request" });
    return;
  }

  // check dates
  if (data.start_date && data.end_date) {
    if (!moment(data.start_date, "YYYY-MM-DD", true).isValid()) {
      res
        .status(400)
        .send({ error: "Bad request: start_date has a wrong format" });
      return;
    }
    if (!moment(data.end_date, "YYYY-MM-DD", true).isValid()) {
      res
        .status(400)
        .send({ error: "Bad request: end_date has a wrong format" });
      return;
    }
    if (
      moment(data.end_date, "YYYY-MM-DD").isBefore(
        moment(data.start_date, "YYYY-MM-DD")
      )
    ) {
      res.status(400).send({
        error: "Bad request: end_date is before start_date has a wrong format"
      });
      return;
    }
  } else {
    res.status(400).send({ error: "Bad request" });
    return;
  }

  try {

    if (data.instrctors && data.instrctors.length !== 0) {
      data.instrctors.map(async el => {
        // check supervisor existance
        const supervisor = await User.findOne({
          _id: el,
          role: "supervisor"
        });
  
        if (!supervisor) {
          res.status(400).send({ error: "supervisor dosn't exist" });
        return;
        }
      })
    }

    // create a new wite test
    const course = new Course({ ...data, participants: [] });
    await course.save();
    res.status(200).send({ data: { course } });
  } catch (error) {
    res.status(400).send(error);
  }
});

// join white test
router.get("/courses/:id/join", auth, async (req, res) => {
  // check for admin role
  if (!req.role || req.role !== "student") {
    res.status(403).send({ error: "Forbidden" });
    return;
  }

  try {
    // get test
    const course = await Course.findOne({ _id: req.params.id });
    const joined = course.participants.find(
      el => `${el._id}` === `${req.id}`
    );
    if (joined) {
      res.status(400).send({ message: "you have already joined" });
      return;
    }
    course.participants.push(req.id);
    await course.save();
    res.status(200).send({ message: "you are registered to this test" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// unjoin white test
router.get("/courses/:id/unjoin", auth, async (req, res) => {
  // check for admin role
  if (!req.role || req.role !== "student") {
    res.status(403).send({ error: "Forbidden" });
    return;
  }

  try {
    // get test
    const course = await Course.findOne({ _id: req.params.id });
    course.participants = course.participants.filter(
      el => `${el._id}` !== `${req.id}`
    );
    await courses.save();
    res.status(200).send({ message: "you unjoined this test" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete white test
router.get("/courses/:id/delete", auth, async (req, res) => {
  // check for admin role
  if (!req.role || req.role !== "admin") {
    res.status(403).send({ error: "Forbidden" });
    return;
  }

  try {
    // get test
    const course = await Course.findOneAndDelete({ _id: req.params.id });
    res.status(200).send({ message: "white test deleted", data: course });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
