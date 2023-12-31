import Order from "../Models/orderModel.js";

class Controller {
    async addOrder(req, res) {
        const data = req.body;
        try {
            const createdOrder = await Order.create(data);
            res.status(200).json(createdOrder);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    async getOrders(req, res) {
        try {
            const getOrders = await Order.find({})
                .populate("user_id")
                .populate("driver_id");
            if (!getOrders) {
                res.json({ message: "No Order Yet" });
            } else {
                res.status(200).json(getOrders);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    async getOrdersById(req, res) {
        const { id } = req.params;
        try {
            const getOrders = await Order.findById(id)
                .populate("user_id")
                .populate("driver_id");
            res.status(200).json(getOrders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    async getOrdersByDriverId(req, res) {
        const { driverId } = req.params;
        try {
            const getOrdersByDriverId = await Order.find({
                driver_id: driverId,
            });
            res.status(200).json(getOrdersByDriverId);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    async deleteOrder(req, res) {
        const { id } = req.params;
        try {
            const dleteOrders = await Order.findByIdAndDelete(id);
            res.status(200).json(dleteOrders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
    async updateOrder(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updateOrders = await Order.findByIdAndUpdate(
                { _id: id },
                { $set: data },
                { new: true }
            );
            res.status(200).json(updateOrders);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
}

const controller = new Controller();

export default controller;
