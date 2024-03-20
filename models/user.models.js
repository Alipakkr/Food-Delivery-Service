const { mongoose } = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        }
      },
      {
        versionKey: false
      }
)

const userModel = mongoose.model("User", userSchema)

module.exports={
    userModel
}

