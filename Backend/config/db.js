import mongoose from "mongoose"
export const dbConnect=async()=>{
const con=await mongoose.connect('mongodb://localhost:27017/quirex')
if(con){
    console.log("connection succesful")
}
}