const express = require('express');
const router = express.Router(); //mini instence hai ye --  ye ham app ki jagah kaam karta hai kyuki hamm (app) ko import/export to kar nhi sakte kyuki (app) puri appplication ka instence hai to ham uski jagah pe help lete hai [Router()] ye ek mini instence hai jo (app) ki jagah kaam karta hai ( or me iss router ko export kr dunga apni main file hai)
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateProducts , isProductAuthor ,isloggedIn , isSeller} = require('../middleware') ;

 router.get('/products' , async(req , res)=>{
  try{
   let products = await Product.find();
    res.render('products/index' , {products }) ;
   } 
    catch(e){
      res.status(500).render('error' , { error:e.message});
    }
 })

// to show the form for the new project 

router.get('/product/new' , isloggedIn ,(req , res)=>{
  try{

  res.render('products/new');
}
catch(e){
  res.status(500).render('error' , { error:e.message});
}
})

// to actually add the product

router.post('/products' ,  validateProducts , isloggedIn , isSeller , async (req , res) => {
try{
  let {name ,image , price , description} = req.body;
  await Product.create({name ,image , price , description , author:req.user._id});
  req.flash('success' , 'Product Added successfully');
   res.redirect('/products');
}
   catch(e){
    res.status(500).render('error' , { error:e.message});
  }
})

// to show a particular product

router.get('/products/:id', isloggedIn ,async (req , res)=>{
try{
  let {id} = req.params;
  let foundProduct = await Product.findById(id).populate('reviews'); // populate is used to get the reviews array of the Product.js
  res.render('products/show' , {foundProduct , msg:req.flash('mssg') });
}
catch(e){
  res.status(500).render('error' , { error:e.message});
}
})

// to edit a product
router.get('/products/:id/edit',  isloggedIn,async(req , res)=>{
try{
  let {id} = req.params;
  let foundProduct = await Product.findById(id);
  res.render('products/edit' , {foundProduct });
}
catch(e){
  res.status(500).render('error' , { error:e.message});
}
})

//to actually edit the data in db

router.patch('/products/:id' , validateProducts, isloggedIn ,  async (req , res)=>{
try{
  let {id} = req.params;
  let {name ,image , price , description} = req.body;
  await Product.findByIdAndUpdate(id , {name ,image , price , description}) 
  req.flash('success' , 'Product updated successfully');
  res.redirect(`/products/${id}`);
}
catch(e){
  res.status(500).render('error' , { error:e.message});
}
})

// to delete a product

router.delete('/products/:id' , isloggedIn , isProductAuthor ,async(req , res)=>{
try{
  let {id} = req.params;

  const product = await Product.findById(id) ;  // ye hamne product se phele ske review hta diye
  for( let id of product.reviews){
    await Review.findByIdAndDelete(id) ;
  }

  await Product.findByIdAndDelete(id);
  req.flash('success' , 'Product deleted successfully');
  res.redirect('/products');
}
catch(e){
  res.status(500).render('error' , { error:e.message});
}
}) 



module.exports = router ;