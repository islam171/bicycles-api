import mongoose from "mongoose";

export const FrameMaterial = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
})

export default mongoose.model('FrameMaterial', FrameMaterial)