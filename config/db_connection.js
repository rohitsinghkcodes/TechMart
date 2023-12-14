import mongoose from "mongoose";
import colors from "colors";

// with the help of mongoose we will connect to mongodb database
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`CONNECTION TO MONGODB DATABASE IS SUCCESSFULL\nHOST: ${conn.connection.host}`.bgGreen.black);
    }catch(err){
        console.log(`Error in MongoDb connection\n Error: ${err}`.bgRed.white);
    }
}


//exporting the connection
export default connectDB;