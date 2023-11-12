import UserModel from '../models/User.js'

export const getUsers = async (req, res) => {
	try{
			const users = await UserModel.find().exec();
			res.json(users)

	}catch(e){
		res.status(500).json({message: "Не удалось вывести список пользователей"})
	}
}

export const getUser = async (req, res) => {
	try{
			const userId = req.params.id
			const user = await UserModel.findOne({_id: userId});
			if(!user){
				return res.json({message: "Пользователь не найден"})
			}
			res.json(user)

	}catch(e){
		res.status(500).json({message: "Не удалось вывести пользователя"})
	}
}

export const deleteUser = async (req, res) => {
	try{
			const userId = req.params.id

			await UserModel.findOneAndDelete({_id: userId}).exec();
			res.json({message: "success"})

	}catch(e){
		res.status(500).json({message: "Не удалось вывести список пользователей"})
	}
}

export const update = async (req, res) => {
	try{
			const userId = req.params.id
			const {username, password} = req.body

			const oldUser = await UserModel.findOne({username: username}).exec()
			if(oldUser){
				console.log(oldUser)
				res.status(403).json({message: "Такой пользователь существует"})
			}

			await UserModel.findByIdAndUpdate(userId, {username, password}).exec();

			const newUser = await UserModel.findById(userId).exec()

			res.json(newUser)

	}catch(e){
		res.status(500).json({message: "Не удалось вывести список пользователей"})
	}
}