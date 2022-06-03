import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

const pizzasAdapter = createEntityAdapter()
const initialState = pizzasAdapter.getInitialState()

interface PizzaResponseType {
    id: string
    name: string
    image: string
    price: number
    currencySign: string
    popularityPoint: number
    type: string
    description: string
    spec: string
}
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: builder => ({
        getPizzas: builder.query<PizzaResponseType[], void>({
            query: () => '/pizzas',
            transformResponse: (responseData: PizzaResponseType[]) => {
                pizzasAdapter.setAll(initialState, responseData)
                return responseData
            },
        }),
    }),
})

export const { useGetPizzasQuery } = apiSlice

export const selectPizzasResult = apiSlice.endpoints.getPizzas.select()

// console.log(selectPizzasResult)

export const selectPizzasData = createSelector(
    selectPizzasResult,
    pizzasResult => pizzasResult.data
)
//
export const { selectAll: selectAllPizzas } = pizzasAdapter.getSelectors(
    (state: EntityState<object>) => state
)
