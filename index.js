const express = require("express");

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route.js");

require("dotenv").config();

const app = express();

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Heliverse");
});

app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Data connected to DB");
  } catch (err) {
    console.log("Connection Failed");
    console.log(err);
  }
  console.log(`Listening on http://localhost:${PORT}`);
});
