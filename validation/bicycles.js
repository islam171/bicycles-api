import { body } from 'express-validator'

export const createBicycleValidation = [
	body('name', 'Имя пользователя должен быть минимум 5 символов'),
	body('price', 'Некорректная цена').isNumeric(),
	body('description', 'Описание должен быть минимум 70 символов')
		.optional()
		.isLength({ min: 70 }),
	body('image', 'Неверное ссылка на аватар').optional().isNumeric(),
	body('rating', 'Некорректный рейтинг')
		.optional()
		.isNumeric()
		.isLength({ min: 0, max: 10 }),
	body('modelYear', 'Некорректный год').optional().isNumeric(),
	body('frameSize', 'Некорректный размер').optional().isNumeric(),
	body('SpeedsNumber', 'Некорректное число сокростей').optional().isNumeric(),
	body('WheelDiameter', 'Некорректный диаметр колеса').optional().isNumeric(),
	body('Seat', 'Некорректное значение').optional().isBoolean(),
	body('folding', 'Некорректное значение').optional().isBoolean(),
	body('typeId', 'Некорректный тип велосипеда').optional().isString(),
	body('frameMaterialId', 'Некорректный материал').optional().isString(),
	body('categoryId', 'Некорректная категория').optional().isString(),
	body('ColorId', 'Некорректный цвет').optional().isString(),
]
