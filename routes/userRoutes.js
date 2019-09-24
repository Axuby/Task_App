const express = require("express");
const router = new express.Router();
const User = require("../models/userModel");

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    res.status(201).json({
      message: "User was created",
      status: "success",
      data: { user }
    });
  } catch (err) {
    res.status(400).json({
      message: "Couldnt create User",
      status: "Fail",
      Info: err
    });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
const token = await user.generateAuthToken()

    res.status(200).json({
      message: "LoggedIn",
      data: user
    });
  } catch (e) {
    res.status(500).json({
      message: "Cant login"
    });
  }
});
router.get("/users/:id", async (req, res) => {
  const _id = req.params._id;
  try {
    const user = await User.findById(_id);
    res.status(200).json({
      message: "Request successful",
      data: { user }
    });
  } catch (error) {
    es.status(404).res.json({
      message: "Not found",
      data: error
    });
  }
});

// .then(user => {
//   res.status(200).json({
//     message: "Request successful",
//     data: { user }
//   });
// })
// .catch(err => {
//   res.status(404).res.json({
//     message: "Not found",
//     data: err
//   });
// });

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "Request successful",
      data: users
    });
  } catch (error) {
    res.status(500).res.json({
      message: "Server error",
      data: err
    });
  }
});
//   User.find({})
//     .then(users => {
//       res.status(200).json({
//         message: "Request successful",
//         data: users
//       });
//     })
//     .catch(err => {
//       res.status(500).res.json({
//         message: "Server error",
//         data: err
//       });
//     });
// });

router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  //const { name, email, password, age } = req.body;
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidUpdates = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdates) {
    res.status(400).json({
      message: "Invalid update"
    });
  }
  try {
    const user = await User.findById(_id);
    updates.forEach(update => {
      user[update] = req.body[update];
    });
    await user.save();
    //const user = User.findByIdAndUpdate( _id , req.body, {
    //   new: true,
    //   runValidators: true
    // });
    res.status(200).json({
      message: "successfully updated",
      data: user
    });
  } catch (error) {
    res.status(404).json({
      message: error
    });
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete({ _id });
    if (!user) {
      throw new Error("Cannot find User");
    }
    res.status(200);
  } catch (err) {
    res.status(500);
  }
});


module.exports = router;
