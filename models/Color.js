import mongoose from "mongoose";

const ColorModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Color', ColorModel)