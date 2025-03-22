const mongoose = require("mongoose");

// product schema
 const productSchema = new mongoose.Schema({
            name :  {
                type : String,
                trim : true,
                required : true
            },
            image :   {
                type : String,
                trim : true,
                //default :
            },
            price :   {
                type : String,
                min : 0,
                required : true
            },
            description :  {
                type : String,
                trim : true,
                //required : true
            },
            reviews :[{
                type : mongoose.Schema.Types.ObjectId,
                ref  : 'Review'
            }] , 

            author:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        
}) 

// model creation
const Product = mongoose.model('Product' , productSchema);

module.exports = Product;