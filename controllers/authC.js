const {registerUser, loginUser}=require('../services/authS')

exports.register=async(req,res,next)=>{
    console.log('---REGISTER CONTOLLER PAGE---')
    try {
        const{username,email,password,confirmPassword,gender,dob}=req.body;
        console.log(req.body)

        if(!username || !email || !password || !confirmPassword || !gender || !dob){
            throw new Error("All Fields are required!!");
        }
        await registerUser({username,email,password,confirmPassword,gender,dob});
        res.status(201).json({message:'User register Successfully'})
    } catch (error) {
        console.log("---ERROR IN REGISTER CONTROLLER PAGE---")
        res.status(400).json({error:error.message})
    }

};

exports.login=async(req,res,next)=>{
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        const token =await loginUser(req.body);
        res.status(200).json({token});
        
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}