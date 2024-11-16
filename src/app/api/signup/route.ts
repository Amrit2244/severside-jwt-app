import validateEmail from "@/helper/validateEmail";
import validatePassword from "@/helper/validatePassword";
import { connectDB } from "@/config/connectDB";
import { User } from "@/models/User";
import bcrypt from 'bcryptjs';
import { useRouter } from "next/navigation";

export async function POST(request:Request){
  
    await connectDB(request);

    try {  // distrct data from body
        const body = await request.json();
        const {email,password} = body;
    
        //validate data
        if(!validateEmail(email)|| !validatePassword){
            return new Response(JSON.stringify({Error:'Invalid Email or Password'}),{status:400});
        }
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return new Response(JSON.stringify({message:'User alredy exists'}),{status:409});
        }
        //hash the password
    
        const hash = bcrypt.hash(password,8);
    
        //create new user
    
        const newUser = new User({
            email,
            password:hash
    
        })
        await newUser.save();
        console.log('User Save Success!!');
        
        return new Response(JSON.stringify({message:"new User saved Successfully",userId:newUser._id}),{status:201})
    
        
    } catch (error : any) {
        console.error('failed to create a new user',error.message);
        return new Response(JSON.stringify({Error:'unable to create user',details:error.message}),{status:500});
        
        
    }
};