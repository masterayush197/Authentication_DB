const Post = require("../models/Post");
const createPost = async(req,res) =>{
    try{
        const {title,content} = req.body;
        if(!title ||!content){
            return res.status(400).json({
                success:false,
                msg:"title and content are requied"
            });
        }
        const post = await Post.create({title,content,user:req.user._id});
        res.status(201).json({
            success:true,
            msg:"Post Created Successfully",
            post
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            msg:"Unable to Post",
            error:err.msg
        })
    }
};


const getAllPost = async (req,res)=>{
    try{
        const posts = await Post.find().populate("user","name email");

        res.json({
            success:"All Posts",
            total:posts.length,
            posts
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            msg:"unable to fetch Posts",
            error:err.msg
        });
    }
};

const getMyPost=async(req,res)=>{
    try{
        const posts = await Post.find({user:req.user._id});
        res.status(201).json({
            success:true,
            msg:"Your Posts",
            total:posts.length,
            posts
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            msg:"Unable to fetch Your Posts",
            error:err.msg
        })
    }

};

const getSinglePost=async(req,res)=>{
    try{
        const{id}= req.params;
        const post = await Post.findById(id);
        if(!post){
            return res.status(401).json({
                success:false,
                msg:"Post Not found"
            })
        }
        res.status(201).json({
            success:true,
            msg:"Post Found",
            post
        });
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            msg:"Unable to fetch Your Posts",
            error:err.msg
        })
    }

};

const updatePost = async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,content} =req.body;
        let post = await post.findById(id);
        if(!post){
            return res.status(401).json({
                success:false,
                msg:"POst not found"
            })
        }
        if(post.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                success:false,
                msg:"you can only update own posts"
            })
        }
        post.title=title || post.title;
        post.content = content || post.content;
        await post.save();

        res.status(200).json({
            success:true,
            msg:"Post Updated",
            post
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            msg:"unable to Update Post",
            error:err.msg
        })
        
    }
};


module.exports= {createPost,getAllPost,getMyPost,getSinglePost}