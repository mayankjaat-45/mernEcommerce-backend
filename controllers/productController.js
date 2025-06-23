const Product = require("../models/Product");

exports.getAllProducts = async (req,res) =>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({message : "Failed to Fetch Products" , error});
    }
}

exports.createProduct = async (req,res) =>{
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({message : " Failed  to create products" , error})
    }
};