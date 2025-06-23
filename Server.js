const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const connectDb = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

connectDb().then(()=>{
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
    })
}).catch((err)=>console.log(err));
