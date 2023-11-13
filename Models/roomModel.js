import { Schema, model } from "mongoose";
const roomSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: "senderModel",
        },
        receiver: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: "receiverModel",
        },
        senderModel: {
            type: String,
            required: true,
            enum: ["User", "Driver"],
        },
        receiverModel: {
            type: String,
            required: true,
            enum: ["User", "Driver"],
        },
    },
    { collection: "Room", timestamps: true }
);
const Room = model("Room", roomSchema);
export default Room;
