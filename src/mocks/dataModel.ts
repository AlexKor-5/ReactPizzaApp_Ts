// MSW Data Model Setup
import { factory, oneOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'

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
