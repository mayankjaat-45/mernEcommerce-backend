import Product from '../models/Product.js';


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
   res.status(500).json({
  message: "Failed to fetch products",
  error: error.message || error.toString()
});
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
  res.status(500).json({
  message: "Failed to fetch products",
  error: error.message || error.toString()
});
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({
  message: "Failed to fetch products",
  error: error.message || error.toString()
});
  }
};


export const addProduct = async (req, res) => {
    const productDetail = req.body;

    console.log('productDetail >>>' , productDetail);
    const product = await Product.create(productDetail);
    if(product){
      res.status(201).send('Producted Created');
    } else{
      res.status(500).send('Failed to create Product');
     
    }
   
};
