import connectDB from "./db/Config.js";
import express  from "express";
import dotenv from "dotenv"
import morgan from "morgan";
import cors from "cors";
import adminRoute from "./Routes/adminRoute.js";
import userRoute from "./Routes/userRoute.js"
import driverRoute from "./Routes/driverRoute.js"
import orderRoute from "./Routes/orderRoute.js"

connectDB()
dotenv.config()
const port = process.env.PORT || 6000
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(morgan("tiny"));
app.use(cors());

// testing server
app.get("/",(req ,res)=>{

    res.send("hello world")

})
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/driver", driverRoute);
app.use("/order", orderRoute);
app.use("*", (req, res) => {
    res.status(404).send({ message: "404 Not Found" });
  });

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })