import { Schema, model } from "mongoose";
const userSchema = new Schema(
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
            default:"User"
        }
    },
    { collection: "User", timestamps: true }
);
const User = model("User", userSchema);
export default User;