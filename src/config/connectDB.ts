import mongoose from "mongoose";

export async function connectDB (request:Request){
    try {
         await mongoose.connect(process.env.MONGO_ as string)
         const connection = mongoose.connection;

         connection.on ('connected',()=>{
            console.log('db is connected successfully');
            
         })
         connection.on('error',(err)=>{
            console.error('error in connecting db',err);
            
         })

    } catch (error:any) {
        console.error('please check the db URI ',error.message);
        throw new Error('falid to connect to db')
        
        
    }

}