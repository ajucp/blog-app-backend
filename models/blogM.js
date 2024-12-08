const {getDb}=require('../utils/db');
const {ObjectId}=require('mongodb');

module.exports=class Blog{
    async createBlog(blog){
        console.log('---CREATE BLOG MODEL---');
        // console.log('blog date is inserted: ',blog)
        const db=getDb();
        try {
            const result=await db.collection('blogs').insertOne(blog);
            // console.log('inserted result: ',result)
            return result;
        } catch (error) {
            console.log('Error in createBlog model:',error.message);
            throw new Error("Error in createBlog Model");
        }
    }

    async getAllBlogs(skip,limit){
        console.log('---GET ALL BLOGS WITH AUTHOR DETAILS---');
        const db=getDb();
        try {
            const blogs = await db.collection('blogs').aggregate([
                {
                    $lookup: {
                        from: 'users', // Collection to join with
                        localField: 'author', // Field in 'blogs'
                        foreignField: '_id', // Field in 'users'
                        as: 'authorDetails', // Result array field
                    },
                },
                {
                    $unwind: '$authorDetails', // Flatten the array
                },
                {
                    $project: {
                        title: 1,
                        content: 1,
                        createdAt: 1,
                        'authorDetails.username': 1,
                        'authorDetails.email': 1,
                    },
                },
                {
                    $skip:skip
                },
                {
                    $limit:limit
                },
            ]).toArray();
            console.log('blogs: ',blogs)
            return blogs;
        } catch (error) {
            console.log('Error in getAllBlogs model:', error.message);
            throw new Error('Error in getAllBlogs model');
        }
    }

    async getBlogByIdWithDetails(id) {
        console.log('---GET BLOG BY ID WITH DETAILS MODEL---');
        const db = getDb();
        try {
            const result = await db.collection('blogs').aggregate([
                {
                    $match: { _id: new ObjectId(id) }, // Match the specific blog by ID
                },
                {
                    $lookup: {
                        from: 'users', // Collection to join with
                        localField: 'author', // Field in 'blogs'
                        foreignField: '_id', // Field in 'users'
                        as: 'authorDetails', // Result array field
                    },
                },
                {
                    $unwind: '$authorDetails', // Flatten the author details array
                },
                {
                    $project: {
                        title: 1,
                        content: 1,
                        createdAt: 1,
                        'authorDetails.username': 1,
                        'authorDetails.email': 1,
                    },
                },
            ]).toArray();
    
            return result[0]; // Return the first matching document
        } catch (error) {
            console.log('Error in getBlogByIdWithDetails model:', error.message);
            throw new Error("Error in getBlogByIdWithDetails model");
        }
    }
    

    async getBlogById(id){
        console.log('---GET BLOG BY ID MODEL---');
        const db=getDb();
        try {
            const result=await db.collection('blogs').findOne({_id:new ObjectId(id)});
            return result;
        } catch (error) {
            console.log('Error in getBlogById Model:',error.message);
            throw new Error("Error in getBlogById model");    
        }
    }

    async updateBlog(id, updatedData) {
        console.log('---UPDATE BLOG MODEL---');
        const db = getDb();
        const { ObjectId } = require('mongodb');
        try {
            const result = await db.collection('blogs').updateOne(
                { _id: new ObjectId(id) }, // Find blog by ID
                { $set: updatedData }      // Update only the provided fields
            );
            return result;
        } catch (error) {
            console.error('Error in updateBlog model:', error.message);
            throw new Error('Error in updateBlog model');
        }
    }
    

    async deleteBlog(id){
        console.log("---DELETE BLOG MODEL---");
        const db=getDb();
            try {
                const result=await db.collection('blogs').deleteOne({_id:new ObjectId(id)})
                return result
            } catch (error) {
                console.log('Error in deleteBlog model:', error.message);
                throw new Error('Error in deleteBlog model');
            }
    }
}

