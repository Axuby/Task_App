const express = require('express') 
const router = new express.Router()
const Task = require('../models/taskModel')


router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).json({
      message: "Task was created",
      status: "success",
      data: { task }
    });
  } catch (err) {
    res.status(400).json({
      message: "Couldnt create User",
      status: "Fail",
      Info: err
    });
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params._id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return new Error("Not found ");
    }
    res.status(200).json({
      message: "Request successful",
      data: { task }
    });
  } catch (error) {
    res.status(404).res.json({
      message: "Not found",
      data: error
    });
  }

  // .then(task => {
  //     if(!task){
  //         return new Error('Not found ')
  //     }
  //   res.status(200).json({
  //     message: "Request successful",
  //     data: { task }
  //   });
  // })
  // .catch(err => {
  //   res.status(404).res.json({
  //     message: "Not found",
  //     data: err
  //   });
  // });
});
router.get("/tasks", (req, res) => {
  Task.find({})
    .then(tasks => {
      res.status(200).json({
        message: "Request successful",
        data: { tasks }
      });
    })
    .catch(err => {
      res.status(404).res.json({
        message: "Not found",
        data: err
      });
    });
});

router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const { description, completed } = req.body;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description","completed"];
  const isValidUpdates = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdates) {
    res.status(400).json({
      message: "Invalid update"
    });
  }

  try {
    const task = Task.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true
    });
    res.status().json({
      message: "Successfully updated",
      data: task
    });
  } catch (error) {
    res.status(404).json({
      message: error
    });
  }
});


router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const { description, completed } = req.body;

  try {
    const task = Task.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true
    });
    res.status().json({
      message: "Successfully updated",
      data: task
    });
  } catch (error) {
    res.status(404).json({
      message: error
    });
  }
});


router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete({ _id });
    if (!task) {
      throw new Error("Cannot find User");
    }
    res.status(200);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router