import { Schema, model } from "mongoose";
const messageSchema = new Schema(
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
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
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
    { collection: "Message", timestamps: true }
);
const Message = model("message", messageSchema);
export default Message;
