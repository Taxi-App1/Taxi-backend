import express from "express"
import UserInfo from "../Controllers/userInfoController.js"

const router = express()

router.get("/tripHistory/:id" ,UserInfo.getTripHistory)


export default router

