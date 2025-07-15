const express= require("express");
const mongoose= require("mongoose");
const userRoutes=require("./routes/userRoutes");
const cors = require('cors');
const app =express();
const PORT=8080;

mongoose.connect("mongodb://127.0.0.1:27017/bookStore").then((req,res)=>{
    console.log("data base connected successfully")
}).catch((error)=>{
    console.log("error in connecting",error);
})

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use('/uploads', express.static('uploads'));
// middlewalre
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// routes
app.use('/api',userRoutes)
app.listen(PORT,()=>{console.log(`server runnig on port ${PORT}`)});
