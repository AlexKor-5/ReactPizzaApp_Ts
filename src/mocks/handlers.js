import { rest } from 'msw'
import { pizzaImages, pizzaNames } from './dataResponse'
import { generateOnePizza } from '../services/generateOnePizza'
import { generateOneSpec } from '../services/generateOneSpec'
import {
    FAUX_DELAY_MS,
    PIZZAS_AMOUNT,
    PIZZAS_DOUGHS_TYPES_OPTIONS,
    PIZZA_SIZE_OPTIONS,
    DEFAULT_CHOSEN_VALUES,
    FAUX_DELAY_MS_LONG,
} from './constants'
import { db } from './dataModel'

// fill pizza and spec table with data
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

const serializePizza = (pizza) => ({
    ...pizza,
    specId: pizza?.specId?.id,
})

// MSW REST API Handlers
export const handlers = [
    rest.get('/pizzas', (req, res, ctx) => {
        const allPizzas = db.pizza.getAll().map(serializePizza)
        return res(ctx.delay(FAUX_DELAY_MS), ctx.status(200), ctx.json(allPizzas))
    }),
    rest.get('/pizzas/:pizzaId', (req, res, ctx) => {
        // console.log('req = ', req)
        let pizza = db.pizza.findFirst({
            where: {
                id: {
                    equals: req.params.pizzaId,
                },
            },
        })
        // error handling
        if (!pizza) {
            return res(
                ctx.delay(FAUX_DELAY_MS),
                ctx.status(404),
                ctx.json('That pizza has not been found!')
            )
        }
        const specId = pizza.specId.id
        pizza = {
            ...pizza,
            specId: specId,
        }
        // if success
        return res(ctx.delay(FAUX_DELAY_MS), ctx.json(pizza))
    }),
    rest.patch('/pizzas/:pizzaId/priceUp', (req, res, ctx) => {
        const { body, params } = req
        const pizza = db.pizza.findFirst({
            where: {
                id: {
                    equals: params.pizzaId,
                },
            },
        })
        const initialPrice = pizza?.staticPrice
        db.pizza.update({
            where: {
                id: {
                    equals: params.pizzaId,
                },
            },
            data: {
                price: initialPrice + +body,
            },
        })
        return res(ctx.status(200))
    }),
    rest.get('/specs', (req, res, ctx) => {
        const currentSpec = db.spec.getAll()
        // .map(spec => ({ ...spec, pizza: spec?.pizza?.id }))
        return res(ctx.delay(FAUX_DELAY_MS_LONG), ctx.status(200), ctx.json(currentSpec))
    }),
    rest.get('/specs/:specId', (req, res, ctx) => {
        const oneSpec = db.spec.findFirst({
            where: {
                id: {
                    equals: req.params.specId,
                },
            },
        })
        return res(ctx.delay(FAUX_DELAY_MS), ctx.status(200), ctx.json(oneSpec))
    }),
    rest.patch('/specs/:specID/doughType', (req, res, ctx) => {
        const { body, params } = req
        db.spec.update({
            where: {
                id: {
                    equals: params.specID,
                },
            },
            data: {
                chosenDoughType: body,
            },
        })
        return res(ctx.status(200))
    }),
]
