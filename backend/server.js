//import packages
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db_connection.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import formidable from 'express-formidable';

//configure env
dotenv.config();

//database config=> connecting db
connectDB();

//Create REST onject -> calling express function into app
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes-> now we can use these routes from anywhere
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);


// Create REST api
app.get("/", (req, res) => {
  res.send({
    msg: "Welcome to eCommerce web app",
  });
});

//initialise the port-> make sure the port is empty
// angular=4200, react=3000, node=8000/8080
const PORT = process.env.PORT || 8080;

//run or listen the app
app.listen(PORT, () => {
  console.log(`SERVER IS UP AND RUNNING ON PORT: ${PORT}`.bgBlue.black);
});
