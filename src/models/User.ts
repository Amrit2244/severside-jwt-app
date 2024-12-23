import mongoose,{model,models} from "mongoose";


const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{timestamps:true});

export const User = models.User || mongoose.model('User',userSchema);
