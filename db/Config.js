import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDB = async() => {
try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME
    })
    console.log(`Connected to: ${conn.connection.host}`);
    console.log(`App lisent on PORT ${process.env.PORT}`)
} catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit();
}
}
export default connectDB;