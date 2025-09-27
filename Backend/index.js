import express from 'express';
import { dbConnect } from './config/db.js';
import router from './route/userRoute.js';
import adminRoute from './route/adminRoute.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Allowed origins for CORS
const allowedOrigins = [
    "https://aeri-vana.vercel.app", // production frontend
    "http://localhost:5173"         // local frontend dev server (Vite)
];

// ✅ CORS middleware
app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true); // allow Postman or curl
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'CORS policy: This origin is not allowed';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// ✅ JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ File upload
app.use(fileUpload());

// ✅ Static folder for uploaded images
app.use('/img', express.static('uploads'));

// ✅ Connect Database
dbConnect();

// ✅ Routes
app.use('/api', router);
app.use('/api', adminRoute);

// ✅ Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
