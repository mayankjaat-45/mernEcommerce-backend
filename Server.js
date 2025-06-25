import express from 'express'
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();
import productRoutes  from './routes/productRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import connectDb from './config.js';
import orderRoutes from './routes/orderRoutes.js'

const PORT = 3000;
const app = express();

const allowedOrigins = [
    'https://mern-ecommerce-frontend-bice.vercel.app/',
    'http://localhost:5173'
]
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders' , orderRoutes);

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server is running on port 3000");
    })
}).catch((err)=>console.log(err));
