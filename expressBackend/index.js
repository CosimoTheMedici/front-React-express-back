const express = require("express");
const app = express();
const port = process.env.PORT || 9000;
const routerPage = require("./routes/Routes")

app.use(express.json());
app.use(
    express.urlencoded({
        extended:true,
    })
);
// app.get("/",(req,res) =>{
//     res.json({message:"ok"});
// });

app.use('/get/data',routerPage);
app.use('/post/data',routerPage);
app.use('/update/data',routerPage);
app.use('/delete/data',routerPage);

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    console.error(err.message,err.stack);
    res.status(statusCode).json({message:err.message});
    return
});
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`);
});