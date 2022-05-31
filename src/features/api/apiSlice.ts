import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface PizzaResponseType{
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

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: builder => ({
        getPizzas: builder.query<PizzaResponseType,void>({
            query: () => '/pizzas',
        }),
    }),
})

export const { useGetPizzasQuery } = apiSlice