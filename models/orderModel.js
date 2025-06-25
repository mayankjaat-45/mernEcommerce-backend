import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items : [
        {
            _id: { type : mongoose.Schema.Types.ObjectId, ref: 'Product'},
            name:String,
            price: Number,
            quantity:Number,
            image: String
        }
    ],
    shippingAddress:{ type :String,
        required:true
    },
    totalAmount:{
        type: Number,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
});

const Order = mongoose.model('Order',orderSchema);
export default Order;