const express = require("express")
const { connection } = require("./db")


require("dotenv").config()

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.json("this is home")
})

app.listen(process.env.PORT, async()=>{
    try{
        await connection
        console.log("connected to db")
        console.log(`server is connected on ${process.env.PORT}`)
    }catch(err){
        console.log(err)
    }
})