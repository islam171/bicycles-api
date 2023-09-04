import { fileURLToPath } from 'url'
import BicycleModel from '../models/Bicycle.js'
import {
	default as packageBicycle,
	default as PackagesBicycleModel
} from '../models/packageBicycle.js'

import path, { dirname } from 'path'

export const create = async (req, res) => {
	try {
		/* const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		} */
		const {
			name,
			description,
			price,
			rating,
			modelYear,
			frameSize,
			SpeedsNumber,
			WheelDiameter,
			Seat,
			folding,
			categoryId,
			packages,
			frameMaterialId,
			colorId,
		} = req.body

		const oldBicycle = await BicycleModel.findOne({ name }).exec()
		if (oldBicycle) {
			return res
				.status(400)
				.json({ message: 'Велосипед с таким именим уже есть' })
		}

		let bicycle = {}

		if(req.files){
			let filename = Date.now().toString() + req.files.image.name
			const __dirname = dirname(fileURLToPath(import.meta.url))
			req.files.image.mv(path.join(__dirname, '..', 'uploads', filename))

			const doc = BicycleModel({
				name,
				price,
				description,
				image: filename,
				rating,
				modelYear,
				frameSize,
				SpeedsNumber,
				WheelDiameter,
				Seat,
				folding,
				categoryId,
				frameMaterialId,
				colorId,
			})

			bicycle = await doc.save()
			
		}else{
			const doc = BicycleModel({
				name,
				price,
				description,
				image: '',
				rating,
				modelYear,
				frameSize,
				SpeedsNumber,
				WheelDiameter,
				Seat,
				folding,
				categoryId,
				frameMaterialId,
				colorId,
			})

			bicycle = await doc.save()
		}

		if (packages) {
			await packages.map(async pack => {
				const packDoc = PackagesBicycleModel({
					packageId: pack,
					bicycleId: bicycle._id.toString(),
				})
				await packDoc.save()
			})
		}
		res.json(bicycle)
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: 'error' })
	}
}

export const update = async (req, res) => {
	try {
		const bicycleId = req.params.id
		const {
			name,
			price,
			description,
			image,
			rating,
			modelYear,
			frameSize,
			SpeedsNumber,
			WheelDiameter,
			Seat,
			folding,
			packages,
		} = req.body
		const oldBicycle = await BicycleModel.findOne({ name })
		if (oldBicycle && oldBicycle._id.toString() !== bicycleId) {
			return res
				.status(400)
				.json({ message: 'Продукт с таким именим уже существует' })
		}
		await BicycleModel.findByIdAndUpdate(bicycleId, {
			name,
			price,
			description,
			image,
			rating,
			modelYear,
			frameSize,
			SpeedsNumber,
			WheelDiameter,
			Seat,
			folding,
		}).exec()
		await packageBicycle.deleteMany({ bicycleId })
		await packages.map(async pack => {
			const packDoc = PackagesBicycleModel({
				packageId: pack,
				bicycleId: bicycleId,
			})
			await packDoc.save()
		})

		res.json({ message: 'success' })
	} catch (e) {
		console.log(e)
		res.status(400).json({ message: 'error' })
	}
}

export const get = async (req, res) => {
	try {
		const bicycleId = req.params.id

		const bicycle = await BicycleModel.findOne({ _id: bicycleId })
		if (!bicycle)
			return res.status(404).json({ message: 'Велосипед не найден' })
		const packages = await packageBicycle.find({ bicycleId }).exec()
		const packageIds = []
		packages.map(pack => {
			packageIds.push(pack._id)
		})
		res.json({ ...bicycle._doc, packages: packageIds })
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: 'error' })
	}
}

export const getAll = async (req, res) => {
	try {
		const page = req.query._page
		const limit = req.query._limit
		const sort = req.query._sort
		const order = req.query._order
		const categoryId = req.query._category
		const bicycleName = req.query._search
		const frameMaterialId = req.query._frameMaterial
		const colorId = req.query._color

		let filter = {}
		if (categoryId) {
			filter.categoryId = categoryId
		}
		if (bicycleName) {
			filter.name = { $regex: bicycleName, $options: 'i' }
		}
		if (frameMaterialId) {
			filter.frameMaterialId = frameMaterialId
		}
		if (colorId) {
			filter.colorId = colorId
		}

		const skip = page * limit - limit

		const bicycle = await BicycleModel.find(filter, null, {
			skip,
			limit,
		}).sort({ [sort]: order })
		res.json(bicycle)
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: 'error' })
	}
}

export const del = async (req, res) => {
	try {
		const bicycleId = req.params.id
		await BicycleModel.findOneAndDelete({ _id: bicycleId }).exec()
		await packageBicycle.deleteMany({ bicycleId })
		res.json({ message: 'success' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: 'error' })
	}
}

export const getByPackage = async (req, res) => {
	try {
		const packageId = req.params.id
		const bicyclePackageList = await packageBicycle.find({ packageId }).exec()
		const bicycles = []
		for (const bicyclePackage of bicyclePackageList) {
			const bicycle = await BicycleModel.findOne({
				_id: bicyclePackage.bicycleId.toString(),
			})
			bicycles.push(bicycle)
		}
		res.json(bicycles)
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: 'error' })
	}
}
