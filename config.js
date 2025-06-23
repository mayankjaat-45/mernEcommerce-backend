const mongoose = require('mongoose');

const connectDb = async ()=>{
    const URI = process.env.MONGODB_URI;
    try {
        await mongoose.connect(URI);
        console.log("MongoDb connected successfully");
    } catch (error) {
        console.error("MongoDb Connection Failed", error);
        process.exit(1)
    }
};

module.exports = connectDb;