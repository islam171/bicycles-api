import mongoose from "mongoose"

const OrderModel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    addressId:{
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})

export default mongoose.model('Order', OrderModel)