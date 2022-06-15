import { pizzaImages } from './dataResponse'
import { nanoid } from '@reduxjs/toolkit'

// Сonstants of all faux back-end application
export const FAUX_DELAY_MS = 1000
export const FAUX_DELAY_MS_LONG = 2000
export const PIZZAS_AMOUNT = pizzaImages.length

export const PIZZAS_DOUGHS_TYPES_OPTIONS = () => [
    { id: nanoid(), type: 'Thin', priceUp: 0 },
    { id: nanoid(), type: 'Conventional', priceUp: 10 },
]
export const PIZZA_SIZE_OPTIONS = () => [
    { id: nanoid(), size: 26, priceUp: 0, measurement: 'sm' },
    { id: nanoid(), size: 30, priceUp: 10, measurement: 'sm' },
    { id: nanoid(), size: 40, priceUp: 20, measurement: 'sm' },
]
export const DEFAULT_CHOSEN_VALUES = {
    doughType: 'Thin',
    size: 26,
}
