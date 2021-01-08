const express = require("express");
const homeRouter = require("./routers/home");
const userRouter = require("./routers/user");
const courseRouter = require("./routers/courses");
const cors = require('cors');
const port = process.env.PORT;
require("./db/db")();

const app = express();

app.use(cors());
app.use(express.json());
app.use(homeRouter);
app.use(userRouter);
app.use(courseRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
