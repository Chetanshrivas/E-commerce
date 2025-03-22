const Product = require('./models/Product'); // If your file is named Product.js

const {productSchema , reviewSchema} = require('./schema') ; 

const validateProducts = (req , res , next )=>{
    const {name , image , price , description} = req.body ;
    const { error } = productSchema.validate({name , image , price , description}) ; 
    if( error){
        return res.render('error') ;
    }
    next() ;

} ;

const validateReviews = (req , res , next )=>{
    const {rating , comment} = req.body ;
    const { error } = reviewSchema.validate({rating , comment}) ; 
    if( error){
        return res.render('error') ;
    }
    next() ;

} ;

const isloggedIn = (req , res , next )=>{
    console.log(req.originalUrl);
    if(!req.isAuthenticated()){
        req.flash( 'error' , 'You must have to login first to view this page.' ) ;
        return res.redirect('/login') ;

    }

    next() ;
} 

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error' , 'You donot have the permission to do that');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error' , 'You donot have the permission to do that');
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor = async(req,res,next)=>{
    let {id} = req.params; //product id
    let product = await Product.findById(id); //entire product
    if(!product.author.equals(req.user._id)){
        req.flash('error' , 'You are not the authorised user');
        return res.redirect('/products');
    }
    next();
}

module.exports = { isProductAuthor  , isSeller , isloggedIn ,validateProducts , validateReviews } ;