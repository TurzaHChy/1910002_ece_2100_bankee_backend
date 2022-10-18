
const express= require('express');
const cors=require('cors');
const corsOptions ={
    origin:'http://localhost:10621',
    credentials:true,            
    optionSuccessStatus:200
}
const userRouter=require('./userRouter');


const app=express();
const morgan=require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use('/api',userRouter);





module.exports=app;