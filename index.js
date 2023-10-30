import connectDB from "./db/Config.js";
import  express  from "express";
import dotenv from "dotenv"
connectDB()
dotenv.config()
const port = process.env.PORT || 6000
const app = express()



// testing server
app.get("/",(req ,res)=>{

    res.send("hello world")

})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })