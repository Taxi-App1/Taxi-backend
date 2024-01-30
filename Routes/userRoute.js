import express from "express"
import controller from "../Controllers/userController.js"
import image from "../Middleware/multer.js"

const router = express()

router.post("/registerUser" ,image.uploadImage,controller.register)
router.get("/getUser" ,controller.getUser)
router.get("/getUser/:id" ,controller.getUserById)
router.post("/updateUser/:id" ,image.uploadImage,controller.updateUser)
router.delete("/deleteUser/:id" ,controller.deleteUser)
router.post("/login"  ,controller.login )



export default router

