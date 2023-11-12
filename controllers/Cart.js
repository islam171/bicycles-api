import { validationResult } from "express-validator"
import BicycleModel from "../models/Bicycle.js"
import CartModel from "../models/Cart.js"

export const add = async (req, res) =>  {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const userId = req.userId
        const bicycle = req.params.id

        const oldBicycle = await BicycleModel.findById(bicycle).exec()
        if(!oldBicycle){
            return res.status(404).json({message: 'Продукт не найден'})
        }

        const oldCart = await CartModel.findOne({bicycle, userId}).exec()
        if(oldCart){
            var count = oldCart.count + 1
            const cart = await CartModel.findByIdAndUpdate(oldCart._id, {count}).populate(['bicycle']).exec()
            return res.json({...cart._doc, count})
        }

        const doc = CartModel({
            bicycle,
            userId,
            count: 1
        })
        const cart = await doc.save()
        res.json({...cart._doc, bicycle: oldBicycle._doc})
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const del = async (req, res) => {
    try{
        const bicycle = req.params.id
        const {userId} = req
        const cart = await CartModel.findOneAndDelete({bicycle, userId})
        res.json(cart)
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'success'})
    }
}

export const delOneProduct = async (req, res) => {
    try{
        const bicycle = req.params.id
        const {userId} = req
        const cart = await CartModel.findOne({userId, bicycle}).exec()
        let count = cart.count - 1
        if(count <= 1){
            count = 1
        }
        await CartModel.findOneAndUpdate({bicycle, userId}, {count})
        const newCart = await CartModel.findOne({userId, bicycle}).populate(['bicycle']).exec()
        res.json({...newCart._doc, count})
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const setProduct = async (req, res) => {
    try{
        const bicycle = req.params.id
        const {count} = req.body
        const {userId} = req
        const cart = await CartModel.findOne({userId, bicycle}).exec()
        await CartModel.findOneAndUpdate({bicycle, userId}, {count})
        const newCart = await CartModel.findOne({userId, bicycle}).populate(['bicycle']).exec()
        res.json(newCart)
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
        const cart = await CartModel.find({userId}).populate('bicycle').exec()
        res.json(cart)
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}