import { rest } from 'msw'
import { pizzaImages, pizzaNames } from './dataResponse'
import { nanoid } from '@reduxjs/toolkit'
import { factory, primaryKey, oneOf } from '@mswjs/data'
import { generateOnePizza } from '../services/generateOnePizza'
import { generateOneSpec } from '../services/generateOneSpec'

// Сonstants of all faux back-end application
const FAUX_DELAY_MS = 500
const PIZZAS_AMOUNT = pizzaImages.length
const PIZZAS_DOUGHS_TYPES_ARRAY = [
    { type: 'Thin', priceUp: 0 },
    { type: 'Conventional', priceUp: 10 },
]
const PIZZA_SIZE_OPTIONS = [
    { size: 26, priceUp: 0, measurement: 'sm' },
    { size: 30, priceUp: 10, measurement: 'sm' },
    { size: 40, priceUp: 20, measurement: 'sm' },
]
// MSW Data Model Setup
export const db = factory({
    pizza: {
        id: primaryKey(nanoid),
        name: String,
        image: String,
        currencySign: String,
        type: String,
        description: String,
        price: Number,
        popularityPoint: Number,
        specId: oneOf('spec'),
    },
    spec: {
        id: primaryKey(nanoid),
        doughTypes: Array,
        sizes: Array,
        pizza: oneOf('pizza'),
    },
    pizzaInCart: {
        id: primaryKey(nanoid),
        pizza: oneOf('pizza'),
        amount: Number,
    },
})

for (let i = 0; i < PIZZAS_AMOUNT; i++) {
    const spec = db.spec.create(generateOneSpec(PIZZAS_DOUGHS_TYPES_ARRAY, PIZZA_SIZE_OPTIONS))
    db.pizza.create(generateOnePizza(pizzaNames[i], pizzaImages[i], spec))
}
// console.log('db = ', db.pizza.getAll())

interface PizzaPropType {
    specId: {
        id: string
    }
}
const serializePizza = (pizza: Partial<PizzaPropType>) => ({
    ...pizza,
    specId: pizza?.specId?.id,
})

// MSW REST API Handlers
export const handlers = [
    rest.get('/pizzas', (req, res, ctx) => {
        const allPizzas = db.pizza.getAll().map(serializePizza)
        return res(ctx.delay(FAUX_DELAY_MS), ctx.status(200), ctx.json(allPizzas))
    }),
    rest.get('/specs', (req, res, ctx) => {
        const allSpecs = db.spec.getAll()
        return res(ctx.delay(2000), ctx.status(200), ctx.json(allSpecs))
    }),
    rest.get('/spec', (req, res, ctx) => {
        return res(ctx.delay(FAUX_DELAY_MS), ctx.status(200), ctx.json([]))
    }),
]
