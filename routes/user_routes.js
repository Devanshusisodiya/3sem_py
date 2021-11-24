require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/user')






router.get('/get-users', async (req,res)=>{
    try{
        const userData =  await User.find()
        res.json({userData})
    }catch(error){
        res.status(500)
    }
})

router.post('/login', async (req, res)=>{

    const user = await User.findOne({username : req.body.username})
    if (!user) return res.status(400).send("Username not found")
    
    const validPass = await User.findOne
    if (!validPass) return res.status(400).send("Password not found")
    res.status(200).json(
        { 
            message: 'signup success',
            username : req.body.username,
            password : user.password
        }
    )
    console.log(req.body.f_name,req.body.password)




    
});
    

    
    


router.post('/reg_user', async (req, res)=>{
    

            
        const user = new User({
            username: req.body.username,
            password: req.body.password,           
                
        })
            
           
    try{
            const newUser = await user.save()
            console.log(newUser)
            res.status(201).json({message: 'new user created', user: newUser})
            
            
            
        }catch(error){
            res.status(400).json({message: error.message})
        }
    
    
});







module.exports = router