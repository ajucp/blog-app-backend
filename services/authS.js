const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/userM');

const UserData=new User();

const registerUser=async({username,email,password,confirmPassword,gender,dob})=>{
    console.log('---REGISTER SERVICE PAGE---')
    try {
        if(password !== confirmPassword){
            throw new Error("Password does not Match");
        }
        
        const existingUser=await UserData.findUserbyUserName(username);
        if(existingUser){
            throw new Error("Username Already Exists");
        }

        const existingEmail=await UserData.findUserByEmail(email);
        if(existingEmail){
            throw new Error("Email already exists");
        }

        const hashedPassword=await bcrypt.hash(password,10);

        await UserData.createUser({username,email,password:hashedPassword,gender,dob,createdAt:new Date()})
    } catch (error) {
        console.error('Error in registerUser service:', error.message);
        throw new Error(error.message);
    }
};



const loginUser=async ({username,password})=>{

    try {
        const user=await UserData.findUserbyUserName(username);

        if(!user || !(await bcrypt.compare(password,user.password))){
            throw new Error("Invalid username or password");
        }

        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        console.log(token);
        return token;

    } catch (error) {
        console.error('Error in loginUser service:', error.message);
        throw new Error(error.message);
    }
};

module.exports={registerUser,loginUser}