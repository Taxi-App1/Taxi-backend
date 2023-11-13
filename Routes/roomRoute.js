import express from "express"
import controller from "../Controllers/roomController.js"

const router = express()

router.post("/createRoom" ,controller.createRoom)
router.get("/getRoom" ,controller.getRoomBySenderAndReciver)



export default router