import { validationResult } from "express-validator"
import BicycleModel from "../models/Bicycle.js"
import OrderModel from "../models/Order.js"
import OrderListModel from "../models/OrderList.js"

export const add = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const {bicycles, addressId, name, phone, email} = req.body

        const {userId} = req

        var totalPrice = 0
        for(const bike of bicycles){
            const bicycle = await BicycleModel.findById(bike._id).exec()
            totalPrice = bike.count * bicycle.price
        }

        const orderDoc = OrderModel({userId, addressId, phone, name, email, price: totalPrice})
        const order = await orderDoc.save()

        
        await bicycles.map(async (bike) => {
            const doc = OrderListModel({
                bicycleId: bike._id, 
                orderId: order._id, 
                count: bike.count,
                userId
            })
            await doc.save()
        })
        res.json({message: 'success'})
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }

}

export const del = async (req, res) =>  {
    try {
        const {userId} = req
        const orderId = req.params.id

        await OrderListModel.deleteMany({orderId: orderId, userId})
        await OrderModel.findOneAndDelete({_id: orderId, userId})
        res.json({message: 'success'})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const get = async (req, res) => {
    try {
        const {userId} = req
        const orderId = req.params.id

        const order = await OrderModel.findOne({_id: orderId, userId}).populate(['addressId']).exec()
        const orderList = await OrderListModel.find({orderId, userId}).populate('bicycleId').exec()


        res.json({
            order, orderList
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const getAll = async (req, res) => {
    try {
        const {userId} = req
        const order = await OrderModel.find({userId}).populate(['addressId']).exec()

        res.json(order)

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

