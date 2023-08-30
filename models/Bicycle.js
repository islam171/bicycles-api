import mongoose from "mongoose";

const BicycleSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
            price: {
                type: Number,
                required: true
            },
        description: String,
        image: String,
        rating: Number,
        modelYear: Number,
        frameSize: Number, // Размер рамы
        SpeedsNumber: Number, // Количество скоростей
        WheelDiameter: Number, // Диаметр колес
        Seat: Boolean, //Сиденье
        folding: Boolean, //складной

        frameMaterialId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FrameMaterial',
            required: true
        }, // Материал рамы
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        colorId: String, //Сборка пакетов
    }, {
        timestamps: true
    }
)

export default mongoose.model('Bicycle', BicycleSchema)