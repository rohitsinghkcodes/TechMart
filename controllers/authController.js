import userModel from "../models/userModel.js";
import { comparePasswords, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//* REGISTER CONTROLLER || POST
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name) {
      res.send({ error: "name is required!" });
    }
    if (!email) {
      res.send({ error: "email is required!" });
    }
    if (!password) {
      res.send({ error: "password is required!" });
    }
    if (!phone) {
      res.send({ error: "name is required!" });
    }

    //findone=. used for finding only 1 document
    const existingUser = await userModel.findOne({ email });

    //checking if user already exists
    if (existingUser) {
      return res.status(400).send({
        msg: "This email is already registered, please use a different email or login",
      });
    }

    //hashing the password
    const hashedPassword = await hashPassword(password);
    //save
    const user = new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      msg: "User registered successfully!",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error in registration",
      err,
    });
  }
};

//* LOGIN USER CONTROLLER || POST
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        msg: "Invalid username or password",
      });
    }

    //check if user exists in db
    const user = await userModel.findOne({ email });
    //if user does not exits in db (not registered) => if registered aage badho👍
    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "Email is not registeed, please register!",
      });
    }

    //checking if password correct or not
    //decrypt pass and compare
    const matchPass = await comparePasswords(password, user.password);
    //if password does not match => if matches aage badho 👍
    if (!matchPass) {
      return res.status(200).send({
        success: false,
        msg: "Invalid password",
      });
    }

    //set token => valid for 7 days
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      msg: "login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error in login",
      err,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send({
    success: true,
    msg: "Protected Route",
  });
};
