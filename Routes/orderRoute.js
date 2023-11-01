import express from "express"
import controller from "../Controllers/orderController.js"

const router = express()

router.post("/addOrder" ,controller.addOrder)
router.get("/getOrder" ,controller.getOrders)
router.get("/getOrder/:id" ,controller.getOrdersById)
router.put("/updateOrder/:id" ,controller.updateOrder)
router.delete("/deleteOrder/:id" ,controller.deleteOrder)


export default router