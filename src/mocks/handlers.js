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
    rest.get('/specs', (req, res, ctx) => {
        const currentSpec = db.spec.getAll()
        // .map(spec => ({ ...spec, pizza: spec?.pizza?.id }))
        return res(ctx.delay(FAUX_DELAY_MS), ctx.status(200), ctx.json(currentSpec))
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
    rest.post('/specs/:specID/doughType', (req, res, ctx) => {
        const { body, params } = req
        // const foundSpec = db.spec.findFirst({
        //     where: {
        //         id: {
        //             equals: params.specID,
        //         },
        //     },
        // })
        // console.log(foundSpec)
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

        return res(ctx.delay(FAUX_DELAY_MS), ctx.status(200))
    }),
]
