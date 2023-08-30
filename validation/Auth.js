import {body} from 'express-validator'

export const registerValidator = [
    body('username', 'Имя пользовотеля должен быть минимум 5 символов').isLength({min: 5}),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('avatar', 'Неверная сылка на автар').optional().isURL()
]

export const loginValidator = [
    body('username', 'Имя пользовотеля должен быть минимум 5 символов').isLength({min: 5}),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5})
]