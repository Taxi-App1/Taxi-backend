import { Schema, model } from "mongoose";
const locationAndAvailabSchema = new Schema(
    {
        lat: {
            type: Number,
        },
        long: {
            type: Number,
        },
        isAvailble: {
            type: Boolean,
        },
        driver_id:{
            type:Schema.Types.ObjectId,
            ref:"Driver"
        }

    },
    { collection: "Location", timestamps: true }
);
const Location = model("Location", locationAndAvailabSchema);
export default Location;
