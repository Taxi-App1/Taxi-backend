import express from "express"
import controller from "../Controllers/messagesController.js"

const router = express()

router.post("/createChat" ,controller.chatting)
router.get("/chattingHistory" ,controller.getChattingBetweenTwo)
// router.get("/getDriver/:id" ,controller.getDriverById)
// router.put("/updateDriver/:id" ,image.uploadImageAndPicId,controller.updateDriver)
// router.delete("/deleteDriver/:id" ,controller.deleteDriver)
// router.post("/login" , controller.login)



export default router