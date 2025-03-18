require("dotenv").config()
const express = require("express");
const app = express();
const port = 5000;

// db connection
const dbConnection = require("./db/dbConfig");

// json middleware  to extract json data
app.use(express.json())

// user routes middleware file
const userRoutes = require("./routes/userRoute");
// user routes middleware
app.use("/api/user", userRoutes);

// question routes middleware file
const questionRoute = require("./routes/questionRoute");

//  authentication middleware
const authMiddleware = require("./middleware/authMiddleware");

// question routes middleware ??
app.use("/api/question", authMiddleware ,questionRoute);

// answer routes middleware ??

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ")
    await app.listen(port);
    console.log("database connection established.");
    
    console.log(`Server running on port ${port}`);
    
  } catch (error) {
    console.log(error);
    
  }
}
start()

