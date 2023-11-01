import Driver from "../Models/driverModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class Controller {
    async register(req, res) {
        const data = req.body;
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            const newDriver = { ...data, password: hashedPassword };
            const createdDriver = await Driver.create(newDriver);

            res.status(200).json(createdDriver);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }

    async getDriver(req, res) {
        try {
            const driver = await Driver.find({});
            if (!driver) {
                res.send("no driver yet !");
            } else {
                res.status(200).json(driver);
            }
        } catch (erorr) {
            console.log(erorr);
            res.status(500).json({ erorr });
        }
    }

    async getDriverById(req, res) {
        const { id } = req.params;
        try {
            const driver = await Driver.findOne({ _id: id });
            if (!driver) {
                res.send("driver not found");
            } else {
                res.status(200).json(driver);
            }
        } catch (erorr) {
            console.log(erorr);
            res.status(500).json({ erorr });
        }
    }

    async updateDriver(req, res) {
        const { id } = req.params;
        try {
            const saltRounds = 10;
            const data = req.body;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            const updateDriver = { ...data, password: hashedPassword };
            const update = await Driver.findOneAndUpdate(
                { _id: id },
                { $set: updateDriver },
                { new: true }
            );

            res.status(200).json(update);
        } catch (erorr) {
            console.log(erorr);
            res.status(500).json({ erorr });
        }
    }

    async deleteDriver(req, res) {
        const { id } = req.params;
        try {
            const driverDelete = await Driver.findByIdAndDelete({ _id: id });
            res.status(200).json(driverDelete);
        } catch (erorr) {
            console.log(erorr);
            res.status(500).json({ erorr });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const findDriver = await Driver.findOne({ email: email });
            if (!findDriver) {
                res.status(400).json({
                    message: "Login not successful",
                    error: "Driver not found",
                });
            }else{
                const isPasswordValid =  bcrypt.compare(password, findDriver.password);
                if (!isPasswordValid) {
                    return res.status(400).send("email or password invalide !!");
                }
                const token = jwt.sign({ driverId: findDriver._id }, process.env.JWT_KEY, {
                    expiresIn: "4d",
                });
                res.status(200).json({
                    findDriver,
                    token,
                    message: `Welcome ${findDriver.first_name}`,
                });
            }
        }  catch (erorr) {
            console.log(erorr);
            res.status(500).json({ erorr });
        }
    }
}

const controller = new Controller();

export default controller;
