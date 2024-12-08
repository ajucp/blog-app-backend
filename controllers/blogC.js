const {createNewBlog,fetchAllBlogs,fetchBlogById,editBlog,removeBlog}=require('../services/blogS');

exports.createBlog=async(req,res)=>{
    // const body=req.body;
    // console.log(body)
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'Unauthorized: User information missing!' });
    }
    try {
        const blog = await createNewBlog({
            ...req.body,
            author: req.user.userId,
        });   
        console.log('Current User ID:', req.user.userId);     
        // console.log('blog: ',blog)
        res.status(201).json(blog);

    } catch (error) {
        console.log("Error in createBlog:", error.message);
        res.status(400).json({error:error.message})
    }
};

exports.getBlogs=async(req,res)=>{
    try {
        const page=parseInt(req.query.page)|| 1;
        const limit=parseInt(req.query.limit) || 6;
        const blogs=await fetchAllBlogs(page,limit);
        res.status(200).json(blogs);

    } catch (error) {
        res.status(400).json({error:error.message});
    }
};


exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params; // Extract blog ID from request params
        const blog = await fetchBlogById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.log("Error in getBlogById controller:", error.message);
        res.status(400).json({ error: error.message });
    }
};


exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID from the URL
        const updatedData = req.body; // Updated blog data from the request body
        const userId = req.user.userId; // User ID from the JWT token
        // console.log("id: ",id);
        // console.log('updatedData:',updatedData)
        // console.log('userId:',userId)

        const result = await editBlog(id, userId, updatedData);
        console.log("result :",result)
        if (result.modifiedCount === 0) {
            throw new Error('No changes were made to the blog');
        }

        res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteBlog=async(req,res)=>{
    // const params=req.params.id
    // const user=req.user.userId
    // console.log(user)
    // console.log(params)
    try {
        const { id } = req.params; // Blog ID
        const userId = req.user.userId; // Logged-in user's ID from the token

        await removeBlog(id,userId);
        res.status(200).json({message:'Blog deleted'});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}