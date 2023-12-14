import express from "express"
import controller from "../Controllers/LocationAndAvailbDriverConttroller.js"

const router = express()

router.post("/createLocation" ,controller.addLocation)
router.get("/getLocationDriver/:driverId" ,controller.getLocationForDriver)
router.get("/getLocationDriverByTypeCar/:typeCar" ,controller.getLocationForDriverByTypeCar)
router.put("/updateLocationDriver/:driverId" ,controller.updateLocationForDriver)



export default router