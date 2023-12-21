import { Schema, model } from "mongoose";

const orderSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        driver_id: {
            type: Schema.Types.ObjectId,
            ref: "Driver",
            required: true,
        },
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        fromCoordinates: {
            long: {
                type: Number,
                required: true,
            },
            lat: {
                type: Number,
                required: true,
            },
        },
        toCoordinates: {
            long: {
                type: Number,
                required: true,
            },
            lat: {
                type: Number,
                required: true,
            },
        },
        typeOfOrder: {
            type: String,
            required: true,
            enum: ["x Bus", "2x Bus", "3x Bus", "Bicycle", "Car", "Motorcycle"],
        },
        total: {
            type: Number,
            default: 0,
        },
        status: {
            type: Boolean,
            default: false,
        },
        rate: {
            type: Number,
            default: 0,
        },
    },
    { collection: "Order", timestamps: true }
);

const Order = model("Order", orderSchema);
export default Order;
