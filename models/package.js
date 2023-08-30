import mongoose from "mongoose";

const PackagesModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
})

export default mongoose.model('Package', PackagesModel)