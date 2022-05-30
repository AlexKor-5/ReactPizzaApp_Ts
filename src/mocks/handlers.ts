import { rest } from 'msw'
import {randomFromArray} from '../services/randomFromArray'
import { nanoid } from '@reduxjs/toolkit'

const pizzaImages = [
    'https://dodopizza-a.akamaihd.net/static/Img/Products/2ac448e39ba24623a33c1d8d50b69ef8_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/afb7bb96c6624a17b69543db3b340c86_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/3a9785bc5ac145118403de7d22b70fd9_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/d23af75498eb47a8a586313792da917f_584x584.jpeg',

    'https://dodopizza-a.akamaihd.net/static/Img/Products/57157f013c164840a24c1d49c7adb3b6_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/01735d5a70154bd3884899030a671629_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/3bc057459afb4b2b8f2781bd1895b3a9_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/5bf1c77b3ff44f93bb01c840ab35b033_584x584.jpeg',

    'https://dodopizza-a.akamaihd.net/static/Img/Products/20734006e66d427fb2cbb8fbb595b21e_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/17f215303faf4fbc86941e27debee436_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/5b5d246f1d154bd39f606d1d72899a27_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/5630c6ed3f394c7ba25e1ef79a67b7ee_584x584.jpeg',

    'https://dodopizza-a.akamaihd.net/static/Img/Products/eb6d128bbcd340e98fd4f14b377e769f_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/aa845b6e841241fbbff1a770b3ad3103_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/952259c12c3b4c009320a36c4b45a8e1_584x584.jpeg',
    'https://dodopizza-a.akamaihd.net/static/Img/Products/bf3377af7cfe4962915668d14bb8d0f4_584x584.jpeg'
]

const pizzaNames = [
    'Prosciutto e funghi pizza',
    'St. Louis-Style Pizza',
    'Pizza rustica',
    'Detroit-Style Pizza',

    'Garlic Fingers',
    'Pizza ortolana',
    'Pizza pesto Genovese',
    'Pizza e fichi',

    'Apizza',
    'Stuffed Pizza',
    'Pizza vegetariana',
    'Fugazza',

    'Pizza fiori di zucca',
    'Pugliese Pizza',
    'Fugazzeta',
    'Pizza al padellino'
]

const generatePizzas = (pizzaImages:string[], pizzaNames:string[]) =>{
    return pizzaImages.reduce((accum:object[],current:string,index:number)=>{
        return [
            ...accum,
            {
                id:nanoid(),
                name:pizzaNames[index],
                image:current,
                doughType:randomFromArray(['Thin','Convencional'])(),
                size:randomFromArray([26,30,40])(),
                price:randomFromArray([26,30,40,50,99,89,59])(),
                currencySign:"$",
                popularityPoint:randomFromArray([26,30,40,100,200,444,323,123,543,30,54,324,44,444,222,333])(),
                type:randomFromArray(['With meat','Vegan','Grill','Spicy'])()
            }
        ]
    },[])
}
interface LoginResponse {
    username: string
    firstName: string
}

export const handlers =[
    rest.get<LoginResponse>('/pizzas', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(generatePizzas(pizzaImages,pizzaNames))
        )
    }),
]