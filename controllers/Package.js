import PackageModel from "../models/package.js";
import ColorModel from "../models/Color.js";

export const create = async (req, res) => {
    try{
        const {name} = req.body
        const oldPackage = await PackageModel.findOne({name}).exec()
        if(oldPackage){
            return res.status(404).json({message: 'Такой пакет уже существует'})
        }
        const doc = PackageModel({
            name
        })
        const packages = await doc.save()
        res.json(packages)

    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const del = async (req, res) => {
    try{

        const packageId = req.params.id
        const packages = await PackageModel.findOneAndDelete({_id: packageId})
        if(!packages){
            return res.status(500).json({message: 'Не удалось удалить пакет'})
        }
        res.json({message: 'success'})

    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'success'})
    }
}

export const get = async (req, res) => {
    try{
        const packageId = req.params.id
        const packages = await PackageModel.findOne({_id: packageId}).exec()
        res.json(packages)
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}

export const getAll = async (req, res) => {
    try{
        const packages = await PackageModel.find().exec()
        res.json(packages)
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}

export const update = async (req, res) => {
    try{
        const {name} = req.body
        const packageId = req.params.id

        const oldPackage= await ColorModel.findOne({_id:packageId}).exec()
        if(!oldPackage){
            return res.status(404).json({message: "Комплектация не найдена"})
        }
        await PackageModel.findByIdAndUpdate(packageId, {name})
        res.json({message: 'success'})
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}