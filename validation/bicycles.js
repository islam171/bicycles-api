import {body} from "express-validator";

export const createBicycleValidation = [
    body('name', 'Имя пользовотеля должен быть минимум 5 символов').isLength({min: 5}),
    body('description', 'Описание должен быть минимум 70 символов').optional().isLength({min: 70}),
    body('price', 'Некоректная цена').isNumeric(),
    body('image', 'Неверное сылка на аватар').optional().isNumeric(),
    body('rating', 'Некоретный рейтинг').optional().isNumeric().isLength({min: 0, max: 10}),
    body('modelYear', 'Некоректный год').optional().isNumeric(),
    body('modelYear', 'Некоректный год').optional().isNumeric(),
    body('frameSize', 'Некоректный размер').optional().isNumeric(),
    body('SpeedsNumber', 'Некоректное число сокростей').optional().isNumeric(),
    body('WheelDiameter', 'Некоректный диаметр колеса').optional().isNumeric(),
    body('Seat', 'Некоректное значение').optional().isBoolean(),
    body('folding', 'Некоректное значение').optional().isBoolean(),
    body('typeId', 'Некоректный тип велосипеда').optional().isString(),
    body('frameMaterialId', 'Некоректный материал').optional().isString(),
    body('categoryId', 'Некоректная категория').optional().isString(),
    body('ColorId', 'Некоректнный цвет').optional().isString(),
]