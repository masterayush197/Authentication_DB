const User = require("../models/User")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken");
const register = async()=>{
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
            
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            msg:"unable to register",
            error:err.messasge
        });
    }
};
const login = ()=>{};
const profile = ()=>{};

const logout = ()=>{};

module.exports={register,login,profile,logout};