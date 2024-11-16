import validateEmail from "@/helper/validateEmail";

import { User } from "@/models/User";
import { connectDB } from "@/config/connectDB";
import bcrypt, { compare } from 'bcryptjs';
import { useRouter } from "next/navigation";
import validatePassword from "@/helper/validatePassword";
import jwt from 'jsonwebtoken';
import { Sign } from "crypto";
import { NextResponse } from "next/server";
import path from "path";
import { getMaxAge } from "next/dist/server/image-optimizer";

export default async function (request:Request){
    // connect the Database 
    await connectDB (request);
    const router = useRouter();
    
    try {
        //extract data the from body
        const body = await request.json();
        const {email,password} = body;

        //validate the data

        if(!validateEmail(email)|| !validatePassword){
            return new Response(JSON.stringify({Error:'Invalid Email or Password'}),{status:400});
        }
        //look at for user in database
        const user = await User.findOne({email})
        if(!user){
            return new Response(JSON.stringify({Error:'User not found'}),{status:400})
            router.push('/protected')

        }
        //compare the password
        const isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched){
            return new Response(JSON.stringify({Error:"Invalid Password"}))
        }
        
        // create token
        const token = jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET as string,{expiresIn:'1h'});

        // set token to cookies 
        const response = NextResponse.json({message:'Login Success!!'})
        response .cookies.set('token',token,{httpOnly:true,secure:process.env.NODE_ENV === 'production',path:'/',maxAge:10}); //10 second to test redirection after expiration 

        return response;

    } catch (error:any) {
        console.error(error.message);
        return new Response(JSON.stringify({Error:'Server Error'}),{status:500})
        
        
    }
    
}
