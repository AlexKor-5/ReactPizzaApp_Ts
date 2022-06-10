import { rest } from 'msw'
import { pizzaImages, pizzaNames } from './dataResponse'
import { nanoid } from '@reduxjs/toolkit'
import { factory, primaryKey, oneOf } from '@mswjs/data'
import { generateOnePizza } from '../services/generateOnePizza'
import { generateOneSpec } from '../services/generateOneSpec'
import {
    FAUX_DELAY_MS,
    PIZZAS_AMOUNT,
    PIZZAS_DOUGHS_TYPES_OPTIONS,
    PIZZA_SIZE_OPTIONS,
    DEFAULT_CHOSEN_VALUES,
} from './constants'

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
        chosenDoughType: String,
        chosenSize: Number,
        pizzaId: String,
        pizza: oneOf('pizza'),
    },
    pizzaInCart: {
        id: primaryKey(nanoid),
        pizza: oneOf('pizza'),
        amount: Number,
    },
})

for (let i = 0; i < PIZZAS_AMOUNT; i++) {
    const spec = db.spec.create(
        generateOneSpec(PIZZAS_DOUGHS_TYPES_OPTIONS, PIZZA_SIZE_OPTIONS, DEFAULT_CHOSEN_VALUES)
    )
    const lastSpecId = db.spec.getAll()[db.spec.getAll().length - 1].id
    const pizza = db.pizza.create(generateOnePizza(pizzaNames[i], pizzaImages[i], spec))
    // add pizzaId value to 'spec table'
    db.spec.update({
        where: {
            id: {
                equals: lastSpecId,
            },
        },
        data: {
            pizzaId: pizza.id,
        },
    })
}

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
        // .map(spec => ({ ...spec, pizza: spec?.pizza?.id }))
        return res(ctx.delay(FAUX_DELAY_MS), ctx.status(200), ctx.json(allSpecs))
    }),
    rest.get('/pizzas/:pizzaId', (req, res, ctx) => {
        const pizza = db.pizza.findFirst({
            where: {
                id: {
                    /* eslint-disable */
                    // @ts-ignore
                    equals: req.params.pizzaId,
                    /* eslint-enable */
                },
            },
        })
        if (!pizza) {
            return res(
                ctx.delay(FAUX_DELAY_MS),
                ctx.status(404),
                ctx.json('That pizza has not been found!')
            )
        }
        return res(ctx.delay(FAUX_DELAY_MS), ctx.json(pizza))
    }),
]
