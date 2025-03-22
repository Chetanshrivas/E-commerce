const mongoose = require('mongoose');

const Product = require('./models/Product') ;  // ab hamme dummy data dalna hai to require krenge model ko yani [Product]

const products = [
    {
        name: 'product 1',
        image:'https://plus.unsplash.com/premium_photo-1731948132439-29777fe3be46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8',
        price: 100,
        description:'abcd'
    },
    {
        name: 'product 2',
        image:'https://images.unsplash.com/photo-1735257676933-828bfbdc03a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
        price: 99,
        description:'efgh'
    },
    {
        name: 'product 3',
        image:'https://images.unsplash.com/photo-1735754953434-6de0d3b531f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
        price: 80,
        description:'ijkl'
    },
    {
        name: 'product 4',
        image:'https://images.unsplash.com/photo-1730292422804-5bbb2bd2d3f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D',
        price: 70,
        description:'mnop'
    },
    {
        name: 'product 5',
        image:'https://images.unsplash.com/photo-1724722154056-f57482d540d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D',
        price: 60,
        description:'qrst'
    }
]

async function seedDB(){
    await Product.insertMany(products);
    console.log("data is seeded in the DB ");
}

module.exports = seedDB;
