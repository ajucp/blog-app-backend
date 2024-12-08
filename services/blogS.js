const { ObjectId } = require('mongodb');
const Blog=require('../models/blogM');

const blogM=new Blog();

const createNewBlog=async (blog)=>{
    if (!blog.author) {
        throw new Error('Author is required to create a blog');
    }
    // console.log('blog created:',blog)
    return await blogM.createBlog({
        ...blog,
        author:new ObjectId(blog.author),
        createdAt: new Date(), 
    });
};

const fetchAllBlogs=async(page=1,limit=6)=>{
    const skip=(page-1)*limit;
    return await blogM.getAllBlogs(skip,limit);
};

const fetchBlogById = async (id) => {
    try {
        return await blogM.getBlogByIdWithDetails(id); // Fetch blog details including author info
    } catch (error) {
        console.log("Error in fetchBlogById service:", error.message);
        throw new Error("Error fetching blog by ID in service layer");
    }
};


const editBlog = async (id, userId, updatedData) => {
    // Fetch the blog to check authorization
    const blog = await blogM.getBlogById(id);
    console.log('blog',blog)
    if (!blog) {
        throw new Error('Blog not found');
    }

    if (blog.author.toString() !== userId) {
        throw new Error('Unauthorized to edit this blog');
    }

    // Update the blog
    return await blogM.updateBlog(id, updatedData);
};


const removeBlog=async(id,userId)=>{
    const blog=await blogM.getBlogById(id);
    if (!blog) {
        throw new Error("Blog not found");
    }
    if (!blog.author.equals(new ObjectId(userId))) {
        throw new Error("Unauthorized to delete this blog");
    }
    return await blogM.deleteBlog(id);
};

module.exports={createNewBlog,fetchAllBlogs,editBlog,removeBlog,fetchBlogById};