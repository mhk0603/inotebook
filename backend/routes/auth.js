const express=require('express');
const router=express.Router();
const User=require('../models/User')

// Create a user using: POST "/api/auth". Doesnt require Authentication
router.post('/',(req,res)=>{
    console.log(req.body)
    const newUser= new User(req.body);
    newUser.save()
    res.send(req.body)
})

module.exports=router