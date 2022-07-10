 require('dotenv').config();
 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 const fileUpload = require('express-fileupload');
 const cookie = require('cookie-parser');



 const app = express();
 console.log(process.env.PAYTM_MID);
 app.use(express.json())
 app.use(cors())
 app.use(cookie())
 app.use(fileUpload({
     useTempFiles: true
 }))


// routes
 app.use('/user',require('./routes/userRouter'))
 app.use('/api/category',require('./routes/categoryRouter'))
 app.use('/api/upload',require('./routes/upload'))
 app.use('/api/product',require('./routes/productRouter'))
 app.use('/api/payment',require('./routes/paymentRouter'))
 



 // connect to mongoDb
 const URL = process.env.MONGO_URL
 mongoose.connect(URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true
     }, err => {
         if (err) throw err;
         console.log("connected to mongodb");
     }

 )



 //  connect to port
 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
     console.log(`server running on port${PORT}`);
 })