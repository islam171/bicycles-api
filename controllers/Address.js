import AddressModel from "../models/Address.js";

export const create = async (req, res) => {
    try{
        const {userId} = req
        const {country, city, postcode, street} = req.body

        const doc = AddressModel({
            userId, country, city, postcode, street
        })
        await doc.save()
        res.json({message: 'success'})
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'status'})
    }
}

export const del = async (req,res) => {
    try{
        const {userId} = req
        const addressId = req.params.id

        await AddressModel.findOneAndDelete({_id: addressId, userId})
        res.json({message: 'success'})
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const update = async (req, res) => {
    try{
        const {userId} = req
        const {country, city, postcode, street} = req.body
        const addressId = req.params.id

        const oldAddress = await AddressModel.findOne({_id: addressId, userId}).exec()
        if(!oldAddress){
            res.status(404).json({message: "Адресс не найден"})
        }
        await AddressModel.findOneAndUpdate({_id: addressId, userId}, {country, city, postcode, street})
        res.json({message: "success"})
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const get = async (req, res) => {
    try{
        const {userId} = req
        const addressId = req.params.id

        const address = await AddressModel.findOne({_id: addressId, userId}).exec()
        res.json(address)
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}

export const getAll = async (req, res) => {
    try{
        const {userId} = req
        const address = await AddressModel.find({ userId}).exec()
        res.json(address)
    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'error'})
    }
}
