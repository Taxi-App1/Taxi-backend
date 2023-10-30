import {Schema,model} from "mongoose"
const adminSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique:true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      
      },
      full_name:{
        type:String,
        required:true
      },

      password: {
        type: String,
        required: true,
        minlength: 6,
      },
     
      role: {
        type: String,
        default:"isAdmin",

      },
    },
    { collection: "Admin", timestamps: true }
  );
  const Admin = model("Admin", adminSchema);
  export default Admin;