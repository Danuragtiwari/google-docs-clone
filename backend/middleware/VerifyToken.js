const express = require("express");
const jwt = require("jsonwebtoken");

const VerifyToken = async(req,res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            msg:"invalid token"
        })
    }
    try {
        const decoded = await jwt.verify(token,"seceret");

        req.User = decoded;

        next();
    } catch (error) {
        return res.status(500).json({
            msg:"Internal Server error"
        })
    }
}
module.exports = VerifyToken;

