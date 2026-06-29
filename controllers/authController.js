const User = require("../models/User")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken");
const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.status.json({
                success:false,
                messasge:"user already exist"
            })
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashPassword});
        res.status(201).json({
            success:true,
            msg:"User Registered",
            user
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            msg:"unable to register",
            error:err.messasge
        });
    }
};
const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                msg:"Invalid Email"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(404).json({
                success:false,
                msg:"invalid password"
            })
        }
        const token =jwt.sign({id:user._id,email:user.email},process.env.SECRET_KEY,{expiresIn:"1d"})
        res.json({
            success:true,
            msg:"Login success",
            token,
            data:user
        })
    }
    catch(err){
        res.status(401).json({
            success:false,
            msg:"Unable to login",
            error:err
        });
    }
};
const profile = (req,res)=>{
    res.json({
        success:true,
        msg:"Profile fetched",
        user:req.user
    })
};

const logout = ()=>{};

module.exports={register,login,profile,logout};