import express from "express";
const router = express.Router();
import controller from "../Controllers/adminController.js"
import { isSuperAdmin } from "../Middleware/auth.js";
router.post("/register",controller.register)
router.post("/login",controller.login)
router.put("/upgrade/:id",controller.upgradeRole)
router.delete("/delete/:id",controller.deleteAdmin)
router.get("/",controller.getallAdmin)
router.put("/update/:id",controller.updateAdmin)
router.post("/logout",controller.logout)
export default router;