const express=require('express');
const {createBlog,getBlogs,deleteBlog,updateBlog,getBlogById}=require('../controllers/blogC');
const jwt=require('jsonwebtoken');


const routes=express.Router();

const authenticate=(req,res,next)=>{

    const authHeader = req.headers.authorization;
    // console.log('header: ',authHeader)
    console.log('Authorization Header:', req.headers.authorization);

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing!' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    // console.log('token: ',token)
    if (!token) {
        return res.status(401).json({ message: 'Token is missing!' });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Attach user information to the request object
        next();
    } catch (error) {
        res.status(401).json({error:'Invalid token'});
    }
};

routes.get('/',getBlogs);
routes.get('/:id', getBlogById);
routes.post('/',authenticate,createBlog);
routes.patch('/:id', authenticate, updateBlog);
routes.delete('/:id',authenticate,deleteBlog);


module.exports=routes;