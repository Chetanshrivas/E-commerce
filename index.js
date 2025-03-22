const express = require('express');
const app = express();
const path = require('path');
const seedDB = require('./seed'); // ye hamne seedDB -- jo ki seed.js  ki file ka fuction hai usse hamne import kr liya yaha pe
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authroutes = require('./routes/auth');
const cartroutes = require('./routes/cart') ;
const welcomeroutes = require('./routes/welcome');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch( (err)=>{
    console.log('Error connecting to MongoDB');
    console.log(err) ; 
})

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie : {
        httpOnly : true ,
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000 ,
    }
};

//-------------------------------------------------------------------------------------------------------------------------------

app.engine('ejs' , ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req , res , next ) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error') ;
    next();
})

passport.use(new LocalStrategy(User.authenticate()));

//seeding database
//seedDB() ;

app.use(productRoutes) ;
app.use(reviewRoutes) ;
app.use(authroutes) ;
app.use(cartroutes) ;
app.use(welcomeroutes);
//-------------------------------------------------------------------------------------------------------------------------------

app.listen(8080 ,  () => {
    console.log('Server is running on port 8080');
})


