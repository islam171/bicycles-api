import mongoose from 'mongoose'

const BicycleSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		description: String,
		image: [String],
		rating: Number,
		modelYear: Number,
		frameSize: Number, // Размер рамы
		SpeedsNumber: Number, // Количество скоростей
		WheelDiameter: Number, // Диаметр колес
		folding: Boolean, //складной

		frameMaterialId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'FrameMaterial',
		}, // Материал рамы
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
		color: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Color',
		} //Цвет пакетов
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Bicycle', BicycleSchema)
