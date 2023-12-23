import userModel from "../models/userModel.js";
import { comparePasswords, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//* REGISTER CONTROLLER || POST
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, security_ans } = req.body;

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
    if (!security_ans) {
      res.send({ error: "Security answer is required!" });
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
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      security_ans,
    }).save();

    res.status(201).send({
      success: true,
      msg: "USER REGISTERED SUCCESSFULLY",
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
        msg: "Email is not registered, please sign up!",
      });
    }

    //checking if password correct or not
    //decrypt pass and compare
    const matchPass = await comparePasswords(password, user.password);
    //if password does not match => if matches aage badho 👍
    if (!matchPass) {
      return res.status(400).send({
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
      msg: "USER SIGNED IN SUCCESSFULLY",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
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

//* forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword, security_ans } = req.body;
    if (!email) res.status(400).send({ msg: "Email is required" });
    if (!newPassword) res.status(400).send({ msg: "New Password is required" });
    if (!security_ans)
      res.status(400).send({ msg: "Secret answer is required" });

    //finding user in db
    const user = await userModel.findOne({ email, security_ans });
    if (!user) {
      res.status(404).send({
        success: false,
        msg: "Wrong email or password!",
      });
    }

    //user data found=> hashing the new password
    const hashedPassword = await hashPassword(newPassword);

    //updating the pssword
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      msg: "Password reset Successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Something went wrong!",
      err,
    });
  }
};

//*test controller
export const testController = (req, res) => {
  res.send({
    success: true,
    msg: "Protected Route",
  });
};
