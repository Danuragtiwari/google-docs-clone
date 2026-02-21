const express = require('express');
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js")
const router = express.Router();

const SignUpInput = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})
router.post("/signup", async (req,res) => {
   const{data, success} = SignUpInput.safeParse(req.body);
   if(!success){
     return res.status(411).json({
        message:"Invalid Input Data"
     })
   }
   try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password,salt);

    const newUser = await User.create({
        username:data.username,
        firstName: data.firstName,
        lastName:data.lastName,
        password:hashedPassword
    });
    const token = jwt.sign({userId:newUser._id}, "seceret", {expiresIn:'1h'});

    return res.status(200).json({
       message:"Account Created Successfully",
       user:newUser,
       token
    })
   } catch (error) {
     console.log(error)
      return res.status(501).json({
        message:"internal Server error"
      })
   }
})

const SignInInput = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin", async (req,res) => {
    const{ data, success}  = SignInInput.safeParse(req.body);
   

    if(!success){
        return res.status(411).json({
            message:"Invalid user input"
        })
    }
    try {
      const user = await User.findOne({username:data.username});
      if(!user){
        return res.status(400).json({
            message:"User does not exists"
        })
      }

      const passwordMatch = await bcrypt.compare(data.password, user.password);

      if(!passwordMatch){
        return res.status(401).json({
            "Message":"Password Not Matched"
        })
      }

      const token = jwt.sign({userId:user._id}, 'seceret', {expiresIn:'1h'});
      res.status(200).json({
        message:"Logged in successfully",
        token,
      })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
})
module.exports = router;