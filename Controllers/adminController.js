import Admin from "../Models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class Controller{



    async register(req, res, next) {
      const { username, password, email, full_name } = req.body;
      if (!password || password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }
  
      try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const user = await Admin.create({
          username,
          password: hash,
          email,
          full_name
        });
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username, role: user.role },
          process.env.JWT_KEY,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(201).json({
          message: "Admin successfully created",
          user,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Error creating admin",
        });
      }
    }
  
    async login(req, res, next) {
      const { username, password } = req.body;
     
      // Check if username and password is provided
      if (!username || !password) {
        return res.status(400).json({
          message: "Username or Password not present",
        });
      }
      try {
        const user = await Admin.findOne({ username });
        if (!user) {
          res.status(400).json({
            message: "Login not successful",
            error: "Admin not found",
          });
        } else {
          // comparing given password with hashed password
          bcrypt.compare(password, user.password).then(function (result) {
            if (result) {
              const maxAge = 3 * 60 * 60;
              const token = jwt.sign(
                { id: user._id, username, role: user.role },
  
                process.env.JWT_KEY,
  
                {
                  expiresIn: maxAge, // 3hrs in sec
                }
              );
              res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000, // 3hrs in ms
              });
              res.status(201).json({
                message: "Admin successfully Logged in",
                user: user._id,
                token,
              });
              
            } else {
              res.status(400).json({ message: "Login not successful" });
            }
          });
        }
      } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        });
      }
    }
  
    async upgradeRole(req, res, next) {
      const { role } = req.body;
      const { id } = req.params;
      // Verify if role and id are present
      if (!role) {
        return res.status(400).json({ message: "Role not provided" });
      }
  
      try {
        const user = await Admin.findById({ _id: id });
  
        // Verify if user is found
        if (!user) {
          return res.status(400).json({ message: "Admin not found" });
        }
  
        // Verify if user is not already an superAdmin
        if (user.role === "isSuperAdmin") {
          return res
            .status(400)
            .json({ message: "Admin is already a superAdmin" });
        }
  
        // Upgrade user role
        user.role = role;
        await user.save();
  
        res.status(201).json({ message: "UpgradeRole successful", user });
      } catch (error) {
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      }
    }
  
  
    async updateAdmin (req, res, next)  {
      const {username, password, full_name, email } = req.body;
  
  
      const { id } = req.params;
  
      // Verify if the required fields are present
      if (!username || !password || !full_name || !email ) {
        return res.status(400).json({ message: "Some fields are missing" });
      }
  
      try {
        // Find the admin to update
        let admin = await Admin.findById(id);
  
        // Verify if admin is found
        if (!admin) {
          return res.status(400).json({ message: "Admin not found" });
        }
  
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        // Update the admin object with the new values
        admin.username = username;
        admin.password = hashedPassword;
        admin.full_name = full_name;
        admin.email = email;
  
        // Save the updated admin object
        await admin.save();
  
        res.status(201).json({ message: "Update Admin successful", admin });
      } catch (error) {
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      }
    }
  
    async deleteAdmin(req, res, next) {
      let { id } = req.params;
      try {
        const response = await Admin.findByIdAndDelete({ _id: id });
        res
          .status(200)
          .send({ success: "Admin deleting successfully ", response });
      } catch (err) {
        next(err);
      }
    }
    async getallAdmin(req, res, next) {
      try {
        const response = await Admin.find();
        res
          .status(200)
          .send({ success: "Admin getting successfully ", response });
      } catch (err) {
        next(err);
      }
    }
  
    // logout 
    async logout(req, res, next) {
     await  res.clearCookie('jwt');
      res.status(200).send({ message: 'Logged out successfully' });
   
  }
  }
  const controller = new Controller();
  
  export default controller;