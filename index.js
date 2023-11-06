import connectDB from "./db/Config.js";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { Server } from "socket.io";
import path from "path";

import adminRoute from "./Routes/adminRoute.js";
import userRoute from "./Routes/userRoute.js";
import driverRoute from "./Routes/driverRoute.js";
import orderRoute from "./Routes/orderRoute.js";
import chatRouter from "./Routes/messagesRoute.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();
dotenv.config();
const port = process.env.PORT || 6000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(
    cors({
        origin: "http://localhost:3000", // Replace with your React app's URL
    })
);
app.use(express.static("appsetting.html"));

// testing server
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "appsetting.html");
    res.sendFile(filePath);
});

app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/driver", driverRoute);
app.use("/order", orderRoute);
app.use("/chat", chatRouter);

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
      origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});
