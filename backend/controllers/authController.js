import userModel from "../models/userModel.js";
import { comparePasswords, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

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
      msg: "New User Registered",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error in Registration",
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
        msg: "Email is not registered, Please sign-up!",
      });
    }

    //checking if password correct or not
    //decrypt pass and compare
    const matchPass = await comparePasswords(password, user.password);
    //if password does not match => if matches aage badho 👍
    if (!matchPass) {
      return res.status(400).send({
        success: false,
        msg: "Invalid Password",
      });
    }

    //set token => valid for 7 days
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      msg: "Signed In Successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error in Sign In",
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
      return res.status(400).send({
        success: false,
        msg: "Wrong email or security ans!",
      });
    }

    //user data found=> hashing the new password
    const hashedPassword = await hashPassword(newPassword);

    //updating the pssword
    await userModel.findByIdAndUpdate(user?._id, { password: hashedPassword });
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

//* UPDATE PROFILE CONTROLLER || PUT
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) {
      res.send({ error: "name is required!" });
    }
    if (!email) {
      res.send({ error: "email is required!" });
    }
    if (!phone) {
      res.send({ error: "name is required!" });
    }

    const user = await userModel.findById(req.user._id);

    //hashing the password
    const hashedPassword = await hashPassword(password);
    // update password
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || "",
      },
      { new: true, select: "-password" }
    );

    res.status(200).send({
      success: true,
      msg: "User Profle Updated Successfully!",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error in Updating User Profile",
      err,
    });
  }
};

//* UPDATE Address CONTROLLER || PUT
export const updateAddressController = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      res.send({ error: "address is required!" });
    }

    const user = await userModel.findById(req.user._id);

    // update password
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        address: address || "",
      },
      { new: true, select: "-password" }
    );

    res.status(200).send({
      success: true,
      msg: "Address Updated Successfully!",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error in Updating Address",
      err,
    });
  }
};

//* GET ALL ORDERS || GET
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-image")
      .populate("buyer", "name");
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      msg: "Error While Fetching Orders",
      err,
    });
  }
};
