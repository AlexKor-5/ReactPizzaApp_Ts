import { rest } from 'msw'
import {generatePizzas} from "../services/generatePizzas"
import {pizzaImages,pizzaNames} from "./dataResponse"

interface PizzasResponse {
    id:string,
    name:string,
    image:string,
    doughType:string,
    size:number,
    price:number,
    currencySign:string,
    popularityPoint:number,
    type:string
}

export const handlers =[
    rest.get<PizzasResponse>('/pizzas', (req, res, ctx) => {
        return res(
            ctx.delay(1000),
            ctx.status(200),
            ctx.json(generatePizzas(pizzaImages,pizzaNames))
        )
    }),
]