const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes")
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("DB connected Successfully "))
.catch((err)=>{console.log("unable to connect DB",err);})

app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{
    console.log("Server Started"+PORT);
    
})