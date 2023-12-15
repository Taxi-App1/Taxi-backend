import express from "express"
import controller from "../Controllers/driverController.js"
import image from "../Middleware/multer.js"

const router = express()

router.post("/registerDriver" ,image.uploadImageAndPicId,controller.register)
router.get("/getDriver" ,controller.getDriver)
router.get("/getDriver/:id" ,controller.getDriverById)
router.get("/getDriverByTypeCar/:typeCar" ,controller.getDriverByTypeCar)
router.post("/updateDriver/:id" ,image.uploadImageAndPicId,controller.updateDriver)
router.delete("/deleteDriver/:id" ,controller.deleteDriver)
router.post("/login" , controller.login)



export default router