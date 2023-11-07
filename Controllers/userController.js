import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class Controller {
    async register(req, res) {
        const data = req.body;
        const userExist = await User.findOne({phone_number:data.phone_number})
        if(userExist){
            return res.status(400).json({message: "This Phone Number Already Use"})
        }else{
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
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
        try {
            const saltRounds = 10;
            const data = req.body;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            const updateUser = { ...data, password: hashedPassword };
            const update = await User.findOneAndUpdate(
                { _id: id },
                { $set: updateUser },
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
                res.status(400).json({
                    message: "Login not successful",
                    error: "User not found",
                });
            }else{
                const isPasswordValid =  bcrypt.compare(password, findUser.password);
                if (!isPasswordValid) {
                    return res.status(400).json({message :"phone or password invalide !!"});
                }
                const token = jwt.sign({ userId: findUser._id }, process.env.JWT_KEY, {
                    expiresIn: "4d",
                });
                res.status(200).json({
                    findUser,
                    token,
                    message: `Welcome ${findUser.first_name}`,
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
