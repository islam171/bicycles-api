import mongoose from "mongoose";

const AddressModel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    country: String,
    city: String,
    postcode: String,
    street: String,
},{
    timestamps: true
})

export default mongoose.model('Address', AddressModel)