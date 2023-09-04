import {validationResult} from "express-validator";
import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        const {username} = req.body
        // Првоерка логина и пароля
        const user = await UserModel.findOne({username: username})
        if(!user){
            return res.status(404).json({
                message: 'Пользотель не найден'
            })
        }

        if(req.body.password !== user._doc.password){
            return res.status(400).json({
                message: 'Неверный логин или пароль'
            })
        }

        const token = jwt.sign({
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            })

        const {password, ...userdata} = user._doc

        res.json({
            ...userdata,
            token
        })
    }catch(e){
        console.log(e)
        res.status(500).json({message: "Не удалось авторизоватся"})
    }
}

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const oldUser = await UserModel.findOne({username: req.body.username})
        if (oldUser) {
            return res.status(400).json({message: 'Пользовотель с таким именим уже есть'})
        }

        // const password = req.body.password
        // const salt = await bcrypt.getSalt(10)
        // const passwordHash = await bcrypt.hash(password, salt)

        const doc = UserModel({
            username: req.body.username,
            password: req.body.password,
            avatar: req.body.avatar,
            photos: ['64f4b971b043f9a0811e7d66', '64f4b928017c95dd58a2989d']
        })

        const user = await doc.save()
        const token = jwt.sign({
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            })

        const {password, ...userdata} = user._doc

        res.json({...userdata, token})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Не удолость зарегистрироватся'})
    }
}

export const getMe = async (req, res) => {
    try{
        const userId = req.userId
        const user = await UserModel.findOne({_id: userId})
        if(user){
            const {password, ...userdata} = user._doc

            res.json({
                ...userdata
            })
        }else{
           res.status(404).json({message: 'Пользовотель не найден'})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Нет доступа'})
    }
}

