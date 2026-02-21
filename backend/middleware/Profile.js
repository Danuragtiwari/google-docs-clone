const express = require("express");
const VerifyToken = require("./VerifyToken");
const User  = require("../models/User.js");

const router = express.Router();

router.get("/profile", VerifyToken, async (req,res) => {
    const userData = req.User;
    const id = userData.userId;
   
    try {
        const user = await User.findOne({_id:id});
        
        res.status(200).json({
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.username
        })
    } catch (error) {
        
    }

})
module.exports  = router;