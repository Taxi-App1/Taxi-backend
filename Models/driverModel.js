import { Schema, model } from "mongoose";
const driverSchema = new Schema(
    {
        first_name: {
            type: String,
            require: true,
        },
        last_name: {
            type: String,
            require: true,
        },
        phone_number: {
            type: String,
            require: true,
            unique: true,
        },
        car_type: {
            type: String,
            require: true,
        },
        car_color: {
            type: String,
            require: true,
        },
        picture_id: {
            type: String,
            require: true,
        },
        isAccess: {
            type: Boolean,
        },
        expire_date: {
            type: Date,
        },
        isAvailble: {
            type: Boolean,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
        },
        password: {
            type: String,
            require: true,
            trim: true,
            lowercase: true,
        },
        image: {
            type: String,
            require: true,
        },
        role:{
            type:String,
            default:"Driver"
        }
    },
    { collection: "Driver", timestamps: true }
);
const Driver = model("Driver", driverSchema);
export default Driver;
