const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport');

// form for sing up 

router.get( '/register' , ( req , res ) => {
       res.render( 'auth/signup' );
});

//to regiser/sing up a user in my DB

router.post('/register' , async(req , res ) => {
    const { username , email , password , role} = req.body; 
    const user = new User({ username , email , role  });
    const newUser = await User.register( user , password  );
    res.redirect('/login')

// this req.login(accepts a call back) is a method jo user ke register hone ke just baad /products page par redirect kra dega login nhi karna padega uske baad
//  req.login( newUser , ( err ) => {
//  if ( err ) {return next( err )} ;
//  req.flash( 'success' , 'Welcome to the site! + req.user.username ' );
//  res.redirect('/products');
//  })
}); 

// form for login

router.get( '/login' , ( req , res ) => {
    res.render('auth/login') ;
})

// to login a user in my DB

router.post('/login' , passport.authenticate('local', { failureRedirect: '/login' }) , (req , res) => {
    req.flash('success' ,  `Welcome back, how can we help you ${req.user.username}?`) ;
    res.redirect('/products') ;
})

//logout route

router.get('/logout' , (req , res) => {

    ()=>{
        req.logout();
    } 

    req.flash('success' , 'Goodbye , see you again buddy :-)') ; 
    res.redirect('/login');
    
})



module.exports = router ; 