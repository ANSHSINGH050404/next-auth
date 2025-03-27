import { error, log } from "console";
import mongoose from "mongoose";
import { connected } from "process";



export async function connect() {

    try {
        mongoose.connect(process.env.MONGO_URL!)
       const connection= mongoose.connection

       connection.on('connected',()=>{
        console.log("DB is connected");
        
       })

       connection.on('error',(error)=>{
        console.log(error);
        process.exit()
       })
        
    } catch (error) {
        console.log("DB is  not Connecting... ");
        console.log(error);
        
        
    }
    
}