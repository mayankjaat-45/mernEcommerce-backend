import express from 'express'
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();
import productRoutes  from './routes/productRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import connectDb from './config.js';
import orderRoutes from './routes/orderRoutes.js'

const app = express();
app.use(cors({origin:
    'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders' , orderRoutes);

connectDb().then(()=>{
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
    })
}).catch((err)=>console.log(err));
