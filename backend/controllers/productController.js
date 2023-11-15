import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route  Get /api/products
// @access Pubblic 
const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products);
});

// @desc Fetch all products by id
// @route  Get /api/products/:id
// @access Pubblic 

const getProductsById = asyncHandler(async(req,res)=>{
    console.log(req.param.id,"id")
    const product = await Product.findById(req.params.id);
    if(product)
    {
    console.log(product)
    return res.json(product)
    }
    res.status(404);
    console.log("reached")
    throw new Error('Resource not found');
});

export {getProducts,getProductsById};