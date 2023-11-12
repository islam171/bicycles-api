import FrameModel from "../models/frameMaterial.js"

export const create = async (req, res) => {
    try{
        const {name} = req.body

        const oldFrame = await FrameModel.findOne({name}).exec()
        if(oldFrame){
            return res.status(404).json({message: "Такой материал рамы уже существует"})
        }

        const doc = FrameModel({name})
        const frame = await doc.save()

        res.json(frame)
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}

export const del = async (req, res) => {
    try{
        const frameId = req.params.id
        
        const material = FrameModel.findById(frameId).exec()
        if(!material){
           return res.status(404).json({'message': "Такой материал не найден"})
        }

        await FrameModel.findOneAndDelete({_id:frameId}).exec()
        res.json({message: 'success'})

    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}

export const get = async (req, res) => {
    try{
        const frameId = req.params.id
        const frame = await FrameModel.findOne({_id: frameId}).exec()
        res.json(frame)
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}

export const getAll = async (req, res) => {
    try{
        const frame = await FrameModel.find().exec()
        res.json(frame)
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}

export const update = async (req, res) => {
    try{
        const {name} = req.body
        const frameId = req.params.id

        const oldFrame = await FrameModel.findOne({_id:frameId}).exec()
        if(!oldFrame){
            return res.status(400).json({message: "Материал рамы не найден"})
        }

        await FrameModel.findOneAndUpdate({_id: frameId}, {name})

        const newFrame = await FrameModel.findById(frameId).exec()
        res.json(newFrame)
    }catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}