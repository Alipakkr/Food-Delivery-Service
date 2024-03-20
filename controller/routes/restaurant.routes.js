const express = require("express")
const { restaurantModel } = require("../../models/restaurant.models")

const restaurantRoute = express.Router()

restaurantRoute.post("/restaurants", async (req, res) => {
    try {
        const { name, address, menu } = req.body;
        const newRestaurant = new restaurantModel({
            name,
            address,
            menu
        })
        await newRestaurant.save()
        res.status(201).json({ msg: "New restaurant added successfully", restaurant: newRestaurant })
    } 
    catch (error) {
        res.status(400).json({ msg: "Failed to add new restaurant", error: error.message })
    }
});

restaurantRoute.get("/", async (req, res) => {
    try {
        const restaurants = await restaurantModel.find();
        res.status(200).json({ restaurants_data: restaurants });
    } 
    catch (error) {
        res.status(500).json({ msg: "Failed to retrieve restaurants", error: error.message });
    }
});

restaurantRoute.get("/:id", async (req, res) => {
    const resId = req.params.id
    try {
        const restaurant = await restaurantModel.findById(resId);
        res.status(200).json({ restaurant_data: restaurant });
    } 
    catch (err) {
        res.status(500).json({ msg: "Failed to retrieve restaurants", error: err });
    }
});

restaurantRoute.get("/:id/menu", async (req, res) => {
    const restaurantId = req.params.id;

    try {
        const restaurant = await restaurantModel.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ msg: "Restaurant not found" });
        }

        res.status(200).json({ menu: restaurant.menu });
    } catch (err) {
        res.status(500).json({ msg: "Failed to retrieve menu", error: err});
    }
});

module.exports={
    restaurantRoute
}