import mongoose from "mongoose";

const OrderListModel = mongoose.Schema({
    bicycleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Bicycle'
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    count: Number
},{
    timestamps: true
})

export default mongoose.model('OrderList', OrderListModel)