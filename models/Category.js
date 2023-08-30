import mongoose from "mongoose";

const CategoryModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Category', CategoryModel)