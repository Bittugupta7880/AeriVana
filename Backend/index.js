import express from 'express';
import { dbConnect } from './config/db.js';
import router from './route/userRoute.js';
import adminRoute from './route/adminRoute.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config(); 

const app = express();

// ✅ Allow JSON parsing
app.use(express.json());

// ✅ File upload
app.use(fileUpload());

// ✅ CORS for frontend
app.use(cors({
    origin: "https://aeri-vana.vercel.app", // replace with your Vercel frontend URL
    credentials: true
}));

// ✅ Connect DB
dbConnect();

// ✅ Static folder
app.use('/img', express.static('uploads'));

// ✅ Routes
app.use('/api', router);
app.use('/api', adminRoute);

// ✅ Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log("Server running...");
});
