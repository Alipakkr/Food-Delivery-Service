const express = require("express")
const { connection } = require("./db")
const { userRoute } = require("./controller/routes/user.routes")
const { restaurantRoute } = require("./controller/routes/restaurant.routes")
require("dotenv").config()

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.json("this is home")
})
app.use("/users", userRoute)
app.use("/restaurants", restaurantRoute)
app.listen(process.env.PORT, async()=>{
    try{
        await connection
        console.log("connected to db")
        console.log(`server is connected on ${process.env.PORT}`)
    }catch(err){
        console.log(err)
    }
})