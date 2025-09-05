import mongoose from "mongoose"
export const dbConnect=async()=>{
const con=await mongoose.connect(process.env.MONGO_URI)
if(con){
    console.log("connection succesful")
}
}