import {body} from "express-validator";

export const addOrderValidation = [
    body('bicycles', "Некоректный массив").isArray(),
    body('addressId', "Некоректный id адреса").isString()
]