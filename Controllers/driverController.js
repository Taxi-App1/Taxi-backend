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
        const data = req.body;
        try {
            const driver = await Driver.findOne({ _id: id });
            if (!driver) return res.status(400).json({status:404, message:"Driver not found"});
            const updatedFields = {};
            if (data.first_name) updatedFields.first_name = data.first_name;
            if (data.last_name) updatedFields.last_name = data.last_name;

            if (data.phone_number && data.phone_number !== driver.phone_number) {
                const driverHasPhone = await Driver.findOne({
                    phone_number: data.phone_number,
                    _id: { $ne: driver._id }, // Exclude the current player from the check
                });
                if (driverHasPhone)
                    return res.status(400).json(
                        {status :408, message :"Phone has already been used"}
                    );
                updatedFields.phone_number = data.phone_number;
            }
            if (data.email && data.email !== user.email) {
                const DrivreHasEmail = await Driver.findOne({
                    email: data.email,
                    _id: { $ne: driver._id }, // Exclude the current player from the check
                });
                if (DrivreHasEmail)
                    return res.status(400).json(
                        {status :402, message :"Email has already been used"}
                    );
                updatedFields.email = data.email;
            }
            if (data.car_type) {
                updatedFields.car_type = data.car_type;
            }
            if (data.car_color) {
                updatedFields.car_color = data.car_color;
            }
            if (data.isAccess) {
                updatedFields.isAccess = data.isAccess;
            }
            if (data.isAvailble) {
                updatedFields.isAvailble = data.isAvailble;
            }
            if (data.password) {
                const salt = bcrypt.genSaltSync(10);
                updatedFields.password = bcrypt.hashSync(data.password, salt);
            }
            if (data.image) {
                updatedFields.image = data.image;
            }
            if (data.picture_id) {
                updatedFields.picture_id = data.picture_id;
            }

            // merge the updated fields with the existing editUser object
            const editDriver = { ...data, ...updatedFields };

            const update = await Driver.findOneAndUpdate(
                { _id: id },
                { $set: editDriver },
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
        const { phone_number, password } = req.body;
        try {
            const findDriver = await Driver.findOne({ phone_number:phone_number });
            if (!findDriver) {
                res.status(400).json({
                    message: "Login not successful",
                    error: "Driver not found",
                });
            } else {
                const isPasswordValid = bcrypt.compare(
                    password,
                    findDriver.password
                );
                if (!isPasswordValid) {
                    return res
                        .status(400)
                        .send("Phone or password invalide !!");
                }
                const token = jwt.sign(
                    { driverId: findDriver._id },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "4d",
                    }
                );
                res.status(200).json({
                    findDriver,
                    token,
                    message: `Welcome ${findDriver.first_name}`,
                });
            }
        } catch (erorr) {
            console.log(erorr);
            res.status(500).json({ erorr });
        }
    }
}

const controller = new Controller();

export default controller;
