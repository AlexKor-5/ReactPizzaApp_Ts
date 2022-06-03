import { rest } from 'msw'
// import { generatePizzas } from '../services/generatePizzas'
import { pizzaImages, pizzaNames } from './dataResponse'
import { nanoid } from '@reduxjs/toolkit'
import { factory, primaryKey, oneOf } from '@mswjs/data'
import { generateOnePizza } from '../services/generateOnePizza'
import { generateOneSpec } from '../services/generateOneSpec'

const FAUX_DELAY_MS = 1000
const PIZZAS_AMOUNT = pizzaImages.length

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
        spec: oneOf('spec'),
    },
    spec: {
        id: primaryKey(nanoid),
        doughType: String,
        size: Number,
        pizza: oneOf('pizza'),
    },
    pizzaInCart: {
        id: primaryKey(nanoid),
        pizza: oneOf('pizza'),
        amount: Number,
    },
})

for (let i = 0; i < PIZZAS_AMOUNT; i++) {
    const spec = db.spec.create(generateOneSpec())
    db.pizza.create(generateOnePizza(pizzaImages[i], pizzaNames[i], spec))
}
// console.log('db = ', db.pizza.getAll())

interface PizzaType {
    spec: {
        id: string
    }
}
const serializePizza = (pizza: Partial<PizzaType>) => ({
    ...pizza,
    spec: pizza?.spec?.id,
})

export const handlers = [
    rest.get('/pizzas', (req, res, ctx) => {
        const allPizzas = db.pizza.getAll().map(serializePizza)
        return res(ctx.delay(FAUX_DELAY_MS), ctx.status(200), ctx.json(allPizzas))
    }),
]
