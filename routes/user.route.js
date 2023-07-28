const express = require("express");

const { Usermodel } = require("../Models/user.model.js");
const { UpdatedUser } = require("../Controller/user.controller.js");

const userRouter = express.Router();

// user/get-all
userRouter.get("/get-all", async (req, res) => {
  // const params = req.query;
  try {
    const users = await Usermodel.find();
    res.send(users);
  } catch (err) {
    res.send("Something error in get method");
    console.log(err);
  }
});

// user/get-paginated?page=1&size=10

userRouter.get("/get-paginated", async (req, res) => {
  const { page, size } = req.query;
  const Id = Number(page);
  const pageSize = Number(size);

  try {
    const users = await Usermodel.find()
      .limit(pageSize)
      .skip((Id - 1) * pageSize);
    res.send(users);
  } catch (err) {
    res.send("Something error in get method");
    console.log(err);
  }
});

// filter

userRouter.get(`/filter`, async (req, res) => {
  try {
    const { page, size, domain, available, gender } = req.query;
    const Id = Number(page);
    const pageSize = Number(size);

    const queryObj = {};

    if (domain) {
      queryObj.domain = domain;
    }

    if (available) {
      queryObj.available = available;
    }

    if (gender) {
      queryObj.gender = gender;
    }
    const filteredUsers = await Usermodel.find(queryObj)
      .limit(pageSize)
      .skip((Id - 1) * pageSize);

    return res.status(201).send(filteredUsers);
  } catch (error) {
    console.log(error);
  }
});

// user/add-user

userRouter.post("/add-users", async (req, res) => {
  const { UserEmail } = req.body;

  const userPresent = await Usermodel.findOne({ UserEmail });

  if (userPresent?.email) {
    return res.status(400).json({ message: "User already exist" });
  } else {
    try {
      const data = req.body;
      await Usermodel.insertMany([data]);
      res.send("User create");
    } catch (err) {
      console.log(err);
      res.send("Something ewent wrong !");
    }
  }
});

// get single data method

userRouter.get("/get-single/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User Id is required" });
  }

  try {
    const query = await Usermodel.findOne({ _id: id });
    if (!query) {
      return res.status(400).json({ message: "User Id is not valid" });
    }

    res.send(query);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong !");
  }
});

userRouter.get("/search", async (req, res) => {
  try {
    const { first_name } = req.query;
    const searchResults = await Usermodel.find({ first_name: first_name });
    return res.send(searchResults);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

// user/update/:id
userRouter.patch("/update/:userID", async (req, res) => {
  const Id = req.params.userID;
  const _id = Id;
  const user = await Usermodel.findById(_id);

  console.log(user);

  const { first_name, domain, available, last_name, email, gender } = req.body;
  const update = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    domain: domain,
    available: available,
    gender: gender,
  };
  try {
    let response = await UpdatedUser(user, update);
    return res.status(201).send(response);
  } catch (error) {
    return res.status(401).send(error);
  }
});

// user/delete/:id
userRouter.delete("/delete/:userID", async (req, res) => {
  const Id = req.params.userID;

  try {
    const query = await Usermodel.findByIdAndDelete({ _id: Id });
    res.send("User deleted successfully");
  } catch (err) {
    res.send("Something error in Delete Method");
    console.log(err);
  }
});

module.exports = { userRouter };
