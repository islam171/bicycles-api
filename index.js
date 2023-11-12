import cors from 'cors'
import express, { json } from 'express'
import fileUpload from "express-fileupload"
import mongoose from 'mongoose'
import * as AddressController from './controllers/Address.js'

import { getIsAdmin, getMe, getNewTokens, login, register } from './controllers/Auth.js'
import * as BicycleController from './controllers/Bicycle.js'
import * as CartController from './controllers/Cart.js'
import * as CategoryController from './controllers/Category.js'
import * as ColorController from './controllers/Color.js'
import * as FrameMaterialController from './controllers/frameMaterial.js'
import * as OrderController from './controllers/Order.js'
import * as PackageController from './controllers/Package.js'
import * as UserController from './controllers/User.js'

import checkAdmin from './utils/checkAdmin.js'
import checkAuth from './utils/checkAuth.js'
import { loginValidator, registerValidator } from './validation/Auth.js'
import { addOrderValidation } from './validation/Order.js'




const app = express()
const PORT = 3001

/* app.use(cors) */

mongoose
	.connect(
		'mongodb+srv://islam:islam@cluster0.zqsujij.mongodb.net/bicycles?retryWrites=true&w=majority'
	)
	.then(() => console.log('DB ok'))
	.catch(err => console.log('DB error', err))

app.use(cors())
app.use(fileUpload())
app.use(json());
app.use(express.static('uploads'))
app.use('/uploads', express.static('uploads'))

//Auth
app.post('/api/v1/auth/login', loginValidator, login)
app.post('/api/v1/auth/register', registerValidator, register)
app.get('/api/v1/auth/me', checkAuth, getMe)
app.get('/api/v1/auth', checkAuth, getNewTokens)
app.get('/api/v1/isAdmin', checkAdmin, getIsAdmin)

app.get('/api/v1/users', checkAdmin, UserController.getUsers)
app.get('/api/v1/user/:id', checkAdmin, UserController.getUser)
app.delete('/api/v1/user/:id', checkAdmin, UserController.deleteUser)
app.patch('/api/v1/user/:id', checkAdmin, UserController.update)

//Bicycles
app.get(
	'/api/v1/bicycle/price',
	BicycleController.getMaxMinPrice
)
app.post(
	'/api/v1/bicycle',
	checkAdmin,
	/* upload.single('image'), */
	BicycleController.create
)
app.patch('/api/v1/bicycle/:id', checkAdmin, BicycleController.update)
app.get('/api/v1/bicycle/:id', BicycleController.get)
app.get('/api/v1/bicycle', BicycleController.getAll)
app.delete('/api/v1/bicycle/:id', checkAdmin, BicycleController.del)
app.get(
	'/api/v1/bicycle/package/:id',
	checkAdmin,
	BicycleController.getByPackage
)


//Cart
app.post('/api/v1/cart/:id', checkAuth, CartController.add)
app.delete('/api/v1/cart/:id', checkAuth, CartController.del)
app.patch('/api/v1/cart/:id', checkAuth, CartController.delOneProduct)
app.patch('/api/v1/cart/set/:id', checkAuth, CartController.setProduct)
app.delete('/api/v1/cart', checkAuth, CartController.clear)
app.get('/api/v1/cart', checkAuth, CartController.get)

//Order
app.post('/api/v1/order', checkAuth, addOrderValidation, OrderController.add)
app.delete('/api/v1/order/:id', checkAuth, OrderController.del)
app.get('/api/v1/order/:id', checkAuth, OrderController.get)
app.get('/api/v1/order', checkAuth, OrderController.getAll)

//Address
app.post('/api/v1/address', checkAuth, AddressController.create)
app.delete('/api/v1/address/:id', checkAuth, AddressController.del)
app.patch('/api/v1/address/:id', checkAuth, AddressController.update)
app.get('/api/v1/address/:id', checkAuth, AddressController.get)
app.get('/api/v1/address', checkAuth, AddressController.getAll)

//Category
app.post('/api/v1/category', checkAdmin, CategoryController.create)
app.get('/api/v1/category/:id', CategoryController.get)
app.get('/api/v1/category', CategoryController.getAll)
app.delete('/api/v1/category/:id', CategoryController.del)
app.patch('/api/v1/category/:id', CategoryController.update)

//Color
app.post('/api/v1/color', checkAdmin, ColorController.create)
app.delete('/api/v1/color/:id', checkAdmin, ColorController.del)
app.patch('/api/v1/color/:id', checkAdmin, ColorController.update)
app.get('/api/v1/color/:id', ColorController.get)
app.get('/api/v1/color', ColorController.getAll)

//frameMaterial
app.get('/api/v1/frame', FrameMaterialController.getAll)
app.get('/api/v1/frame/:id', FrameMaterialController.get)
app.post('/api/v1/material', checkAdmin, FrameMaterialController.create)
app.delete('/api/v1/frame/:id', checkAdmin, FrameMaterialController.del)
app.patch('/api/v1/frame/:id', checkAdmin, FrameMaterialController.update)

//Package
app.get('/api/v1/package', PackageController.getAll)
app.get('/api/v1/package/:id', PackageController.get)
app.post('/api/v1/package', checkAdmin, PackageController.create)
app.delete('/api/v1/package/:id', checkAdmin, PackageController.del)
app.patch('/api/v1/package/:id', checkAdmin, PackageController.update)


//Test
app.get('/', (req, res) => {
	res.send('hello')
})

app.listen(PORT, err => {
	if (err) {
		return console.log(err)
	}
	console.log(`Server start in port ${PORT}`)
})
