import CartModel from "../models/Cart.js";
import BicycleModel from "../models/Bicycle.js";
import {validationResult} from "express-validator";

export const add = async (req, res) =>  {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const {count} = req.body
        const userId = req.userId
        const bicycleId = req.params.id

        const oldBicycle = await BicycleModel.findById(bicycleId).exec()
        if(!oldBicycle){
            return res.status(404).json({message: 'Продукт не найден'})
        }

        const oldCart = await CartModel.findOne({bicycleId, userId}).exec()
        if(oldCart){
            const cart = await CartModel.findByIdAndUpdate(oldCart._id, {count}).exec()
            return res.json(cart)
        }

        const doc = CartModel({
            bicycleId,
            userId,
            count
        })
        const cart = await doc.save()
        res.json(cart)
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const del = async (req, res) => {
    try{
        const bicycleId = req.params.id
        const {userId} = req
        const cart = await CartModel.findOneAndDelete({bicycleId, userId})
        res.json(cart)
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'success'})
    }
}

export const delOneProduct = async (req, res) => {
    try{
        const bicycleId = req.params.id
        const {userId} = req
        const cart = await CartModel.findOne({userId, bicycleId}).exec()
        const count = cart.count - 1
        await CartModel.findOneAndUpdate({bicycleId, userId}, {count})
        res.json({message: 'success'})
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const clear = async (req, res) => {
    try{
        const {userId} = req
        await CartModel.deleteMany({userId})
        res.json({message: 'success'})
    }catch (e) {
        console.log(e)
        res.json({message: 'error'})
    }
}

export const get = async (req, res) => {
    try{
        const {userId} = req
        const cart = await CartModel.find({userId}).exec()
        res.json(cart)
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}