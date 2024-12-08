require('dotenv').config();
const express=require('express');
const mongoConnect = require('./utils/db').mongoConnect;
const bodyParser=require('body-parser');
const cors=require('cors');


const authRoutes=require('./routes/authRoutes');
const blogRoutes=require('./routes/blogRoutes');

const app=express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/api/blogs',blogRoutes);




mongoConnect(()=>{
    const PORT = process.env.PORT || 5000; 
    app.listen(PORT);
});