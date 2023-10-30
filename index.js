import connectDB from "./db/Config.js";
import express  from "express";
import dotenv from "dotenv"
import morgan from "morgan";
import cors from "cors";
import adminRoute from "./Routes/adminRoute.js";

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
app.use("*", (req, res) => {
    res.status(404).send({ message: "404 Not Found" });
  });

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })