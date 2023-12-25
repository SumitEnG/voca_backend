require("express-async-errors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/register");
const authRoute = require("./routes/auth");
const error = require("./middleware/error");
const flashcard = require("./routes/flashcard");
const openAi = require("./routes/openAi");
require("dotenv").config();

app.use(express.json());

app.use(
  cors({
    origin: "https://main--fabulous-malabi-e0fca9.netlify.app",
  })
);

app.use("/api/register", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/flashcard", flashcard);
app.use("/api/chat", openAi);

app.use(error);

let connection;
if (app.get("env") == "development") {
  connection = process.env.dbUrlDevelopment;
} else if (app.get("env") == "production") {
  connection = process.env.dbUrlProduction;
}

mongoose
  .connect(connection)
  .then(() => {
    console.log(`connected to ${app.get("env")} db `);
  })
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listenning on ${port}`));
