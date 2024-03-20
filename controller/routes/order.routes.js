const express = require("express")
const { orderModel } = require("../../models/order.models")
const { userModel } = require("../../models/user.models")
const { restaurantModel } = require("../../models/restaurant.models")

const orderRoute = express.Router()

orderRoute.post("/orders", async (req, res) => {
    try {
        const { userId, restaurantId, items, totalPrice, deliveryAddress } = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(400).json({ msg: "Restaurant not found" });
        }

        const newOrder = new orderModel({
            user: userId,
            restaurant: restaurantId,
            items,
            totalPrice,
            deliveryAddress
        });
        await newOrder.save();

        res.status(201).json({ msg: "Order placed successfully", order: newOrder });
    } catch (err) {
        res.status(500).json({ msg: "Failed to place order", error: err });
        console.log(err)
    }
});

orderRoute.get("/:id", async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await orderModel.findById(orderId).populate("user", "-password").populate("restaurant").exec();

        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        res.status(200).json({ order });
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch order details", error: err });
    }
});

orderRoute.put("/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.status(204).json({ msg: "Order status updated successfully", order });
    } catch (err) {
        res.status(500).json({ msg: "Failed to update order status", error: err });
    }
});
module.exports={
    orderRoute
}