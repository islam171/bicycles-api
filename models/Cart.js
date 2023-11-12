import mongoose from "mongoose"

const CartModel = mongoose.Schema({
        bicycle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bicycle',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }, {
        timestamps: true
    }
)

export default mongoose.model('Cart', CartModel)