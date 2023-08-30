import mongoose from "mongoose";

const PackageBicycleModel = mongoose.Schema({
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    },
    bicycleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bicycle'
    }
}, {
    timestamps: true
})

export default mongoose.model('PackageBicycle', PackageBicycleModel)