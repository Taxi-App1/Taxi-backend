import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class Controller {
    async register(req, res) {
        const data = req.body;
        const userExist = await User.findOne({
            phone_number: data.phone_number,
        });
        if (userExist) {
            return res
                .status(400)
                .json({ message: "This Phone Number Already Use" });
        } else {
            try {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(
                    data.password,
                    saltRounds
                );
                const newUser = { ...data, password: hashedPassword };
                const createdUser = await User.create(newUser);

                res.status(200).json(createdUser);
            } catch (error) {
                console.log(error);
                res.status(500).json({ error });
            }
        }
    }

    async getUser(req, res) {
        try {
            const user = await User.find({});
            if (!user) {
                res.send("no user yet !");
            } else {
                res.status(200).json(user);
            }
        } catch (erorr) {
            console.log(erorr);
            res.status(500).json({ erorr });
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findOne({ _id: id });
            if (!user) {
                res.send("user not found");
            } else {
                res.status(200).json(user);
            }
        } catch (erorr) {
            console.log(erorr);
            res.status(500).json({ erorr });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const user = await User.findOne({ _id: id });
            if (!user)
                return res
                    .status(400)
                    .json({ status: 404, message: "Driver not found" });
            const updatedFields = {};
            if (data.first_name) updatedFields.first_name = data.first_name;
            if (data.last_name) updatedFields.last_name = data.last_name;

            if (data.phone_number && data.phone_number !== user.phone_number) {
                const userHasPhone = await User.findOne({
                    phone_number: data.phone_number,
                    _id: { $ne: user._id }, // Exclude the current player from the check
                });
                if (userHasPhone)
                    return res.status(400).json({
                        status: 408,
                        message: "Phone has already been used",
                    });
                updatedFields.phone_number = data.phone_number;
            }
            if (data.email && data.email !== user.email) {
                const UserHasEmail = await User.findOne({
                    email: data.email,
                    _id: { $ne: user._id }, // Exclude the current player from the check
                });
                if (UserHasEmail)
                    return res.status(400).json({
                        status: 402,
                        message: "Email has already been used",
                    });

                updatedFields.email = data.email;
            }
            if (data.password) {
                const salt = bcrypt.genSaltSync(10);
                updatedFields.password = bcrypt.hashSync(data.password, salt);
            }
            if (data.image) {
                updatedFields.image = data.image;
            }

            // merge the updated fields with the existing editUser object
            const editUser = { ...data, ...updatedFields };

            const update = await User.findOneAndUpdate(
                { _id: id },
                { $set: editUser },
                { new: true }
            );

            res.status(200).json(update);
        } catch (erorr) {
            console.log(erorr);
            res.status(500).json({ erorr });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const userDelete = await User.findByIdAndDelete({ _id: id });
            res.status(200).json(userDelete);
        } catch (erorr) {
            console.log(erorr);
            res.status(500).json({ erorr });
        }
    }

    async login(req, res) {
        const { phone_number, password } = req.body;
        try {
            const findUser = await User.findOne({ phone_number: phone_number });
            if (!findUser) {
                return res.status(400).json({
                    message: "Login not successful",
                    error: "User not found",
                });
            }

            if (!password) {
                return res
                    .status(400)
                    .json({ message: "Please enter your password!" });
            }

            const isPasswordValid = await bcrypt.compare(
                password.trim(),
                findUser.password.trim()
            )

            if (!isPasswordValid) {
                return res
                    .status(400)
                    .json({ message: "Phone or password invalid!" });
            }

            const token = jwt.sign(
                { userId: findUser._id },
                process.env.JWT_KEY,
                {
                    expiresIn: "4d",
                }
            );

            
            return res.status(200).json({
                findUser,
                token,
                message: `Welcome ${findUser.first_name}`,
            });
        } catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({
                error: error.message || "Internal Server Error",
            });
        }
    }
}

const controller = new Controller();

export default controller;
