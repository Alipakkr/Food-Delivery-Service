const express = require("express")
const { userModel } = require("../../models/user.models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

require("dotenv").config()

const userRoute = express.Router()

userRoute.post("/register", async(req, res)=>{
    const {name, email, password, address} = req.body

    try{
        const exists = await userModel.findOne({email})
        if(exists){
            return res.status(400).json({msg: "user already exists"})
        }

        bcrypt.hash(password, 5, async(error, hash)=>{
            const user = new userModel({
                name, 
                email, 
                password:hash,
                address: {
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    country: address.country,
                    zip: address.zip
                }   
            })
            await user.save()
            res.status(201).json({msg:"new user has been registed", registedUser : user})
        })
    }
    catch(err){
        res.status(400).json({msg:"error occured while registed", error: err})
    }
})

userRoute.post("/login", async(req, res)=>{
    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email})

        if(user){
            bcrypt.compare(password, user.password, (error, result)=>{
                if(error){
                    res.status(400).json({msg:"User does not exists"})
                }
                if(result){
                    const secrete_key = process.env.secrete_key;
                    const token = jwt.sign({userID: user._id}, secrete_key, {expiresIn : "1d"})
                    res.status(201).json({msg:"Login successfull!!!", login_User : user.name, token})
                }
                else{
                    res.status(201).json({msg:"Password is wrong"})
                }
            })
        }
        else{
            res.status(400).json({msg:"User does not exists"})
        }
    }
    catch(err){
        res.status(400).json({msg:"User does not exists"})
    }
})

userRoute.put("/:id/reset", async(req, res)=>{
    const userId = req.params.id
    const {currPassword, newPassword} = req.body

    try{
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(200).json({msg: "User not found"})
        }
        const isValid = await bcrypt.compare(currPassword, user.password)
        if(!isValid){
            return res.status(200).json({msg: "Invalid current password"})
        }
        const hash = await bcrypt.hash(newPassword, 5)

        user.password = hash;
        await user.save();
        res.status(204).json({ msg: "Password reset successfully",user :user});
    }
    catch(err){
        res.status(500).json({ msg: "Error resetting password", error: err });
        console.log(err)
    }
})
module.exports ={
    userRoute
}