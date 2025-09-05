import express from 'express';
import {dbConnect} from './config/db.js';
import router from './route/userRoute.js';
import adminRoute from './route/adminRoute.js'
import fileUpload from 'express-fileupload';
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config(); 
const app=express();
app.use(express.json());
app.use(fileUpload());
app.use(cors());
const PORT=process.env.PORT || 9000; 
dbConnect();
app.use('/img',express.static('uploads'));
 app.use('/api',router);
 app.use('/api',adminRoute)
app.listen(PORT,()=>{
    console.log("Server running..."); 
})