import {body} from "express-validator";

export const addBicycleToCart = [
    body('count', 'Некоректное число').isNumeric()
]