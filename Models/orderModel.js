import { Schema, model } from "mongoose";
const orderSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        driver_id: {
            type: String,
            type: Schema.Types.ObjectId,
            ref:"Driver",
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

        rate: {
            type: Number,
            default: 0,
        },
    },
    { collection: "Order", timestamps: true }
);
const Order = model("Order", orderSchema);
export default Order;
