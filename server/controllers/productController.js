import fs from 'fs';
import productModel from '../models/productModel.js';
import slugify from 'slugify';
import braintree from 'braintree';

// Payment Gateway
// let gateway = new braintree.BraintreeGateway({
//     environment: braintree.Environment.Sandbox,
//     merchantId: process.env.BRAINTREE_MERCHANT_ID,
//     publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//     privateKey: process.env.BRAINTREE_PRIVATE_KEY,
//   });
  


// To create and upload a new product
export const uploadProductController = async (req,res) => {
    try {
        
       const {name,description,price,category,quantity,shipping} = req.fields;

       const {photo} = req.files;

      
       if(!name || !description || !price  || !category || !quantity){
             return res.status(500).send({
                error : "complete information is ** required"
             })
       }


       if( photo && photo.size >  1000000){
         return res.status(500).send({
            error : "photo is req. and size must be smaller than 1mb"
         })
       }

       const newProduct = await productModel.create({...req.fields
                                                      , slug : slugify(name) 
                                                      , photo : {data :fs.readFileSync(photo.path)
                                                      , contentType :  photo.type }
                                                    });
       
    //    if(photo){
    //       newProduct.photo.data = fs.readFileSync(photo.path);
    //       newProduct.photo.contentType = photo.type;
    //    }

       return res.status(201).send({
          success : true,
          message : "product is uploaded",
          newProduct
       })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "error in uploading product",
            error
        })
    }
}



export const getProductController = async (req,res) => {

    try {

        const Products = await productModel.find({})
                                  .populate('category').
                                  select('-photo').
                                  limit(12).
                                  sort({createdAt : -1});
        
        return res.status(200).send({
            success: true,
            countTotal : Products.length,
            message : "all products",
            Products
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message : "error in getting all product"
        })
    }
}


export const singleProductController = async (req,res) => {
    try {

        const singleProduct = await productModel.findOne({slug : req.params.slug})
                                      .populate('category')
                                      .select('-photo');

        return res.status(200).send({
            success : true,
            message : "single product",
            singleProduct
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "error in getting single product",
            error
        })
    }
}


export const productPhotoController = async (req,res) => {
    try {
        const {pid} = req.params;
        const product = await productModel.findById(pid).select("photo");

        if(product.photo.data){
             res.set('Content-type' , product.photo.contentType);
             return res.status(200).send(product.photo.data);
        }  
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "error in getting photo",
            error
        })
    }
}


export const deleteProductController = async (req,res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id).select("-photo");

        return res.status(200).send({
            success : true,
            deletedProduct
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message : "error in deleting product",
            error
        })
    }
}


// will handle it later
export const updateProductController = async (req,res) => {}


// payment api's

export const braintreeTokenController = async(req,res) => {
    try {
        gateway.clientToken.generate({} , function(err,response){
            if(err){
              res.status(500).send(err);
            }else{
                res.send(response);
            }
        })
    } catch(error) {
        console.log(error);
    }
}

export const braintreePaymentController = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}