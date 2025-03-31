import mongoose from "mongoose";
let alreadyConnected=false;
export async function connectDatabase(){
   try{
    if(alreadyConnected){
        return;
    }
    const uri=`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.zqzqy.mongodb.net/`
    await mongoose.connect(uri)
    mongoose.connection.on('connected',()=>{
        console.log('Successfully Connected to database.')
    })
    alreadyConnected=true;

   }
   catch(err:any){
    throw new Error(`Error in connecting to database: ${err.message}`);
   }
}