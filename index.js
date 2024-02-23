import connectDB from "./db/Config.js";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import adminRoute from "./Routes/adminRoute.js";
import userRoute from "./Routes/userRoute.js";
import driverRoute from "./Routes/driverRoute.js";
import orderRoute from "./Routes/orderRoute.js";
import chatRouter from "./Routes/messagesRoute.js";
import roomRouter from "./Routes/roomRoute.js";
import userInfoRouter from "./Routes/userInfoRoute.js";
import LocationAndAvailbDriverRoute from "./Routes/LocationAndAvailbDriverRoute.js";
import User from "./Models/userModel.js";

connectDB();
dotenv.config();
const port = process.env.PORT || 6000;
const app = express();
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(
    cors({
        origin: "*", // Replace with your React app's URL
    })
);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Then use it to serve static files
app.use(express.static(path.join(__dirname, "public")));

// testing server
app.get("/", (req, res) => {
    return res.send("hello world");
});

app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/driver", driverRoute);
app.use("/order", orderRoute);
app.use("/chat", chatRouter);
app.use("/room", roomRouter);
app.use("/userInfo", userInfoRouter);
app.use("/location", LocationAndAvailbDriverRoute);

// app.use("*", (req, res) => {
//     res.status(404).send({ message: "404 Not Found" });
//   });

// socket IO

const expressServer = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const io = new Server(expressServer, {
    transports: ["websocket", "polling"],
    cors: {
        origin: "*",
    },
});

import bcrypt from "bcrypt";

app.delete("/deleteAccount", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Use async/await to wait for the findOne query to finish
        const findUser = await User.findOne({ email });

        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Use bcrypt.compare to compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(
            password,
            findUser.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // If the password is valid, proceed with deleting the account
        // Perform account deletion logic here

        // Example: Remove the user from the database
        await User.deleteOne({ email });

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connect to server`);
    socket.on("join_room", (data) => {
        console.log(`${socket.id} join room ${data}`);
        socket.join(data);
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log(data.content);
    });
    socket.on("disconnect", () => {
        console.log("user disconnect", socket.id);
    });
    socket.on("typing", (data) => {
        // Emit show-typing event to all sockets in the room except the current socket
        socket.to(data.room).emit("show-typing", data.name);
    });
});
