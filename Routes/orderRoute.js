import express from "express";
import controller from "../Controllers/orderController.js";

const router = express();

router.post("/addOrder", controller.addOrder);
router.get("/getOrder", controller.getOrders);
router.get("/getOrderById/:id", controller.getOrdersById);
router.get("/getOrderByDriverId/:driverId", controller.getOrdersByDriverId);
router.get("/getIsNotEndedOrder", controller.getIsNotEndedOrder);
router.put("/updateOrder/:id", controller.updateOrder);
router.delete("/deleteOrder/:id", controller.deleteOrder);

export default router;
