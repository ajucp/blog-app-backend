const {getDb}=require('../utils/db');


module.exports=class User{

    async createUser(user){
        console.log('---REGISTER MODEL PAGE---')
        const db=getDb();
        try {
            const result=await db.collection('users').insertOne(user)
            return result
        } catch (error) {
            console.log('Error in createUser model:',error.message)
            throw new Error("Error in CreateUser Model");
        }
    }
    async findUserbyUserName(username){
        console.log('---REGISTER MODEL PAGE---')
        const db=getDb();
        try {
            const result=await db.collection('users').findOne({username})
            return result
        } catch (error) {
            console.error('Error in findUserbyUserName model:', error.message);
            throw new Error("Error in findUser name Model");
        }
    }
    async findUserByEmail(email){
        console.log('---REGISTER MODEL PAGE---')
        const db=getDb();
        try {
            const result=await db.collection('users').findOne({email})
            return result
        } catch (error) {
            console.error('Error in findUserByEmail model:', error.message);
            throw new Error("Error in findUser email Model");
        }
    }
};

