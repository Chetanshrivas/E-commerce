const express = require('express');
const router = express.Router(); //mini instence hai ye --  ye ham app ki jagah kaam karta hai kyuki hamm (app) ko import/export to kar nhi sakte kyuki (app) puri appplication ka instence hai to ham uski jagah pe help lete hai [Router()] ye ek mini instence hai jo (app) ki jagah kaam karta hai ( or me iss router ko export kr dunga apni main file hai)
const Product = require('../models/Product'); //product model ko import karte hai
const Review = require('../models/Review'); //review model ko import karte hai
const {validateReviews} = require('../middleware') ;




router.post("/products/:id/review" , validateReviews  ,async(req , res) =>{
try{
    let { id } = req.params
   let { rating , comment}  = req.body ;
   const product = await Product.findById(id);
   const review = await Review.create({rating , comment});
   
   product.reviews.push(review);
   await product.save();
   req.flash('success' , 'Review Added Successfully');
   res.redirect(`/products/${id}`);
}
catch(e){
  res.status(500).render('error' , { error:e.message});
}

});
 

module.exports = router ;