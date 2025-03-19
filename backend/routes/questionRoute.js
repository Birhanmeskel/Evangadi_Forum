const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbConfig");
const { randomUUID } = require("crypto");
const { StatusCodes } = require("http-status-codes");


router.get("/all-questions", async (req, res) => {
  try {
    // Execute a query to fetch all questions from the database
    const [allQuestions] = await dbConnection.execute(
      "SELECT * FROM questions"
    );
    // Respond with a JSON payload containing all questions and metadata
    if (allQuestions.length < 1) {
      res.status(404).json({
        error: "Not Found",
        message: "No questions found.",
      });
    }
    res.status(200).json(allQuestions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    // Handle server errors with a 500 Internal Server Error
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
});

// Post Question
router.post("/", async (req, res) => {
  // get data from user
  const { title, description, tag } = req.body;
  const userid = req.user.userid;

  if (!title) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      msg: "please provide all required fields!",
    });
  }
  try {
    // send data to database
    const questionid = randomUUID();
    console.log({ "user ID": userid, QID: questionid });
    await dbConnection.query(
      "INSERT INTO questions(questionid , title, description, tag, userid ) VALUES (?, ?, ?,?,?)",
      [questionid, title, description, tag, userid]
    );
    return res.status(StatusCodes.CREATED).json({
      msg: "Question created successfully",
    });
  } catch (error) {
    console.error("Error during post question:", error);
    // Handle server errors with a 500 Internal Server Error
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
});
module.exports = router;
