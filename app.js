const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/NewP";
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected");
  })
  .catch(err => {
    console.log("error connecting", err);
  });

const port = process.env.PORT || 5050;
  
app.listen(port, () => {
  console.log(`Server up on ${port}`);
});

// const test = async () => {
//   const password = "ghhoiuege";
//   const hashedPassword = await bcrypt.hash(password, 10);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare("ghhoiuege", hashedPassword);
//   console.log(isMatch);
// };
// test();
