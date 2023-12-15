import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {

    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// middleware to protect admin login
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(400).send({
        success: false,
        msg: "Unauthorised Access, not admin!",
      });
    } else {
        console.log('Access Authorised');
      next();
    }
    console.log(user.role);

  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: "bad request",
      error : err,
    });
  }
};
