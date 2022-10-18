const port=6006;
const app=require('./app');


app.listen(port,()=>{
    console.log("listening to port "+port);
});
