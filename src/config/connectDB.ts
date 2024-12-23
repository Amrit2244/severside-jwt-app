

import mongoose from "mongoose";

export async function connectDB (){
    try {
         await mongoose.connect(process.env.MONGO_URI as string)
         const connection = mongoose.connection;

         connection.on ('connected',()=>{
            console.log('db is connected successfully');
            
         })
         connection.on('error',(err)=>{
            console.error('error in connecting db',err);
            process.exit(1)
            
         })

    } catch (error:any) {
        console.error('please check the db URI ',error.message);
        throw new Error('falid to connect to db')
        
        
    }

}

