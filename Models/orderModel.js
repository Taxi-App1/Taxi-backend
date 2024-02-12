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
            enum: ["Car", "Comfort", "Van", "Bus", "Moto", "TukTuk"],
        },
        total: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },
        ride_status: {
            type: String,
            enum: ["Completed", "Canceled"],
        },
        rate: {
            type: Number,
            default: 0,
        },
        is_ended:{
            type: Boolean,
            default: false,
        }
    },
    { collection: "Order", timestamps: true }
);

const Order = model("Order", orderSchema);
export default Order;
