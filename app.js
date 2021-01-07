const express = require("express");
const homeRouter = require("./routers/home");
const userRouter = require("./routers/user");
const classroomRouter = require("./routers/classroom");
const whiteTestRouter = require("./routers/whiteTest");
const cors = require('cors');
const port = process.env.PORT;
require("./db/db")();

const app = express();

app.use(cors());
app.use(express.json());
app.use(homeRouter);
app.use(userRouter);
app.use(classroomRouter);
app.use(whiteTestRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
