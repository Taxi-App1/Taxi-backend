import Location from "../Models/LocationAndAvailbDriver.js";
import Driver from "../Models/driverModel.js"
class controller {
    async addLocation(req, res) {
        const data = req.body;
        try {
            const addlocation = await Location.create(data);
            return res.status(200).json(addlocation);
        } catch (erorr) {
            console.log(erorr);
            res.send(erorr);
        }
    }
    async getLocationForDriver(req, res) {
        const { driverId } = req.params;
        console.log(driverId)
        try {
            const getLocationDriver = await Location.findOne({
                driver_id: driverId,
            }).populate("driver_id");
            return res.status(200).json(getLocationDriver);
        } catch (erorr) {
            console.log(erorr);
            res.send(erorr);
        }
    }

    async getLocationForDriverByTypeCar(req, res) {
        const { typeCar } = req.params;
    
        try {    
            const drivers = await Driver.find({ car_type: typeCar });    
            const driverIds = drivers.map(driver => driver._id);
    
            const locationDrivers = await Location.find({
                driver_id:{$in : driverIds},
            }).populate("driver_id")
        
            return res.status(200).json(locationDrivers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
    
    async updateLocationForDriver(req, res) {
        const { driverId } = req.params;
        const data = req.body;

        try {
            const getLocationDriver = await Location.findOne({
                driver_id: driverId,
            });

            if (!getLocationDriver) {
                return res
                    .status(404)
                    .json({ success: false, message: "Location not found" });
            }
            const updatedLocationDriver = await Location.findOneAndUpdate(
                { driver_id: driverId },
                { $set: data },
                { new: true } 
            );
            return res
                .status(200)
                .json({ success: true, location: updatedLocationDriver });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    }
}

const Controller = new controller();

export default Controller;
