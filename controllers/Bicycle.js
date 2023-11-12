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
			folding,
			categoryId,
			packages,
			frameMaterialId,
			color
		} = req.body


		const oldBicycle = await BicycleModel.findOne({ name }).exec()
		if (oldBicycle) {
			return res
				.status(400)
				.json({ message: 'Велосипед с таким именем уже есть' })
		}

		let bicycle = {}

		if(req.files){
			const files = [];

			if(req.files.image.length > 1){
				for(const key in req.files.image){
					let file = req.files.image[key]
					let filename = Date.now().toString() + file.name
					const __dirname = dirname(fileURLToPath(import.meta.url))	
					const pathFile = path.join(__dirname, '..', 'uploads/image/bicycle', filename)
					file.mv(pathFile)
					files.push(`/uploads/image/bicycle/${filename}`)
				}
			}else{
					let file = req.files.image
					let filename = Date.now().toString() + file.name
					const __dirname = dirname(fileURLToPath(import.meta.url))	
					const pathFile = path.join(__dirname, '..', 'uploads/image/bicycle', filename)
					file.mv(pathFile)
					files.push(`/uploads/image/bicycle/${filename}`)

			}			

			const doc = BicycleModel({
				name,
				price,
				description,
				image: files,
				rating,
				modelYear,
				frameSize,
				SpeedsNumber,
				WheelDiameter,
				folding,
				categoryId,
				frameMaterialId,
				color,
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
				folding,
				categoryId,
				frameMaterialId,
				color,
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
				.json({ message: 'Продукт с таким именем уже существует' })
		}


		if(req.files){
			const files = [];

			for(const key in req.files.image){
				let file = req.files.image[key]
				let filename = Date.now().toString() + file.name
				const __dirname = dirname(fileURLToPath(import.meta.url))	
				const pathFile = path.join(__dirname, '..', 'uploads/image/bicycle', filename)
				file.mv(pathFile)
				files.push(`/uploads/image/bicycle/${filename}`)
			}
			

			await BicycleModel.findByIdAndUpdate(bicycleId, {
				name,
				price,
				description,
				image: files,
				rating,
				modelYear,
				frameSize,
				SpeedsNumber,
				WheelDiameter,
				Seat,
				folding,
			}).exec()

		}else{
			await BicycleModel.findByIdAndUpdate(bicycleId, {
				name,
				price,
				description,
				image: "",
				rating,
				modelYear,
				frameSize,
				SpeedsNumber,
				WheelDiameter,
				Seat,
				folding,
			}).exec()
		}

		packages && await packageBicycle.deleteMany({ bicycleId })
		packages && await packages.map(async pack => {
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
		const {_maxPrice, _minPrice} = req.query 


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
			filter.colors = colorId
		}
		if(_maxPrice || _minPrice){
			filter.price = {$gte: 0, $lte: 0}
		}
		if(_maxPrice){
			filter.price["$lte"] = _maxPrice
		}
		if(_minPrice){
			filter.price["$gte"] = _minPrice
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

export const getMaxMinPrice = async (req, res) => {
	try{
		const bicycle = await BicycleModel.find()
		
		if(bicycle.length == 0){
			return res.status(404).json({message: 'Велосипеды не найдены'})
		}

		const max = await	BicycleModel.findOne({}).sort({ price: -1 }).limit(1).exec();
		const min = await	BicycleModel.findOne({}).sort({ price: 1 }).limit(1).exec();
	
 		res.json({min: min.price, max: max.price})
	}catch(e){
		console.log(e)
		res.status(500).json({ message: 'error' })
	}
}