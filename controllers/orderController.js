
import Order from "../models/orderModel.js";

export const createOrder = async(req,res)=>{
    try {
        const {items, shippingAddress, totalAmount} = req.body;

        if(!items || items.length === 0){
            return res.status(400).json({message : 'Cart is Empty'})
        }
        const order = new Order({items, shippingAddress , totalAmount});
        const savedOrder = await order.save();
         res.status(201).json({message : 'Order Placed SuccessFully', orderId: savedOrder._id})
    } catch (error) {
        res.status(400).json({message : 'Error placing Order', error})
    }
}