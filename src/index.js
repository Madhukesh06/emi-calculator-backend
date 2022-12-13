const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const userRouter = require("./model/user/user.router");
const EMIRouter = require("./model/emicalculator/emi.router");

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/emi", EMIRouter);

app.get("/", (req, res) => res.send("hello world!"));

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server started on port ${PORT}`);
});
