const { mongoose } = require("mongoose")

const menuSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        image: String
    },
    {
        versionKey: false
    })
    
const restaurantSchema = mongoose.Schema(
    {
        name: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        },
        menu: [menuSchema]
      },
      {
        versionKey: false
      }
)

const restaurantModel = mongoose.model("Restaurant", restaurantSchema)

module.exports={
    restaurantModel
}

