const mongoose = require('mongoose');

const books=mongoose.Schema({
    bookName:{
        required:true,
        type:String
    },
     bookAuthor:{
        required:true,
        type:String
    }, bookPrice:{
        required:true,
        type:Number
    },
     bookImage:{
        required:true,
        type:String
    }
})
const book=mongoose.model("books",books)
module.exports=book