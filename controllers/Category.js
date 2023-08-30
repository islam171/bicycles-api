import CategoryModel from "../models/Category.js";

export const create = async (req, res) => {
    try{
        const {name} = req.body

        const doc = CategoryModel({name})
        const category = await doc.save()

        res.json(category)

    }catch(e){
        console.log(e)
        res.json({message: 'success'})
    }
}

export const get = async (req, res) => {
    try{
        const bicycleId = req.params.id

        const bicycle = await CategoryModel.findOne({_id: bicycleId}).exec()
        res.json(bicycle)
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const getAll = async (req, res) => {
    try{
        const bicycle = await CategoryModel.find().exec()
        res.json(bicycle)
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const del = async (req, res) => {
    try{
        const bicycleId = req.params.id
        await CategoryModel.findByIdAndDelete(bicycleId).exec()
        res.json({message: 'success'})
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const update = async (req, res) => {
    try{

        const bicycleId = req.params.id
        const {name} = req.body

        const oldBicycle = await CategoryModel.findOne({_id: bicycleId}).exec()
        if(!oldBicycle){
            res.status(404).json({message: 'Категория не найдено'})
        }

        await CategoryModel.findByIdAndUpdate(bicycleId, {name})
        res.json({message: 'success'})

    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}