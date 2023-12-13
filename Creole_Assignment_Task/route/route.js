
// Importing express module
const express=require("express")
const router=express.Router()
const connection = require('../connection/connection')
const mongoose = require('mongoose')
const schema = require('../validation/joi')
const {reqValidator} = require('../validation/reqValidator')
const middleware = require('../middleware/auth')

const { userModel }= require('../model/product')
  
// Handling request using router
router.post("/register",reqValidator(schema.register), middleware.generateAuthJwt,async (req,res,next)=>{
    let data = req.body;
    req.body.token = middleware.generateAuthJwt

    let isExist = await userModel.findOne({email: req.body.email})
    if(!isExist){
        let addProduct = await userModel.create(req.body)
        res.status(200).json({message:'User added.', data:addProduct})
    }else{
        res.status(400).json({message: "Email already exist"})
    }
})

router.put("/update",async (req,res,next)=>{
    let data = req.body;
    let isUpdated = await userModel.findOneAndUpdate({email: req.body.email},{$set:data}, {new: true})
    if(!isUpdated){
        let addProduct = await userModel.create(req.body)
        res.status(200).json({message:'User updated.', data:{}})
    }else{
        res.status(400).json({message: "User not updated"})
    }
})

router.delete("/delete",reqValidator(schema.deleted),async (req,res,next)=>{
    let {email} = req.params;
    let isDeleted = await userModel.findByIdAndDelete({ email: email})
    if(isDeleted){
        res.status(200).json({message:'User deleted.'})
    }else{
        res.status(400).json({message: "User not deleted"})
    }
})

router.get("/list",reqValidator(schema.list),async (req,res,next)=>{
    let isFetched = await userModel.find()
    if(isFetched){
        res.status(200).json({message:'User Fetched.', data:isFetched})
    }else{
        res.status(400).json({message: "User not Fetched"})
    }
})

// NOTE : we are not using JWS token 
router.post("/login",reqValidator(schema.login),middleware.generateAuthJwt, async (req,res,next)=>{
    let {email, password} = req.body;
    req.body.token = middleware.generateAuthJwt
    let isExist = await userModel.findOne({email: email, password: password})
    if(isExist){
        res.status(200).json({message:'Login success.', data:isExist})
    }else{
        res.status(400).json({message: "Invalid credential"})
    }
})
  
// Importing the router
module.exports=router