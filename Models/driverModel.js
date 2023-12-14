import { Schema, model } from "mongoose";
const driverSchema = new Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: true,
            unique: true,
        },
        car_type: {
            type: String,
            required: true,
            enum: ["Bus", "2x Bus" , "3x Bus" ,"Bicycle" ,"Car" , "Motorcycle" ],
        },
        car_color: {
            type: String,
            required: true,
        },
        picture_id: {
            type: String,
            required: true,
        },
        isAccess: {
            type: Boolean,
            default:false
        },
        expire_date: {
            type: Date,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        image: {
            type: String,
            required: true,
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
