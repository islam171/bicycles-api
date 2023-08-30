import ColorModel from "../models/Color.js";

export const create = async (req, res) => {
    try{
        const {name} = req.body

        const oldColor = await ColorModel.findOne({name}).exec()
        if(oldColor){
           return res.status(401).json({message: "Такой цвет уже существует"})
        }

        const doc = ColorModel({name})
        const type = await doc.save()

        res.json(type)
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}

export const del = async (req, res) => {
    try{

        const colorId = req.params.id
        const color = await ColorModel.findOneAndDelete(colorId).exec()
        if(!color){
            return res.status(500).json({message: 'Не удалось удалить цвет'})
        }
        res.json({message: 'success'})

    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
  }

export const get = async (req, res) => {
    try{
        const colorId = req.params.id
        const color = await ColorModel.findOne({_id: colorId}).exec()
        res.json(color)
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
  }

export const getAll = async (req, res) => {
    try{
        const color = await ColorModel.find().exec()
        res.json(color)
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}

export const update = async (req, res) => {
    try{
        const {name} = req.body
        const colorId = req.params.id

        const oldColor = await ColorModel.findOne({_id:colorId}).exec()
        if(!oldColor){
            return res.status(400).json({message: "Цвет не найден"})
        }

        await ColorModel.findOneAndUpdate({_id:colorId}, {name})
        res.json({message: 'success'})
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}