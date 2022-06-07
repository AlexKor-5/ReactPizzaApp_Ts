import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit'
import { RootState } from '../store/store'
import { PizzaResponseType, SpecResponseType } from './responseTypes'

const pizzasAdapter = createEntityAdapter()
const pizzaInitialState = pizzasAdapter.getInitialState()

const specsAdapter = createEntityAdapter()
const specsInitialState = specsAdapter.getInitialState()

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    endpoints: builder => ({
        getPizzas: builder.query<EntityState<unknown>, void>({
            query: () => '/pizzas',
            transformResponse: (responseData: PizzaResponseType[]) => {
                return pizzasAdapter.setAll(pizzaInitialState, responseData)
            },
        }),
        getSpecs: builder.query<EntityState<unknown>, void>({
            query: () => '/specs',
            transformResponse: (responseData: SpecResponseType[]) => {
                return specsAdapter.setAll(specsInitialState, responseData)
            },
        }),
    }),
})
// Queries
export const { useGetPizzasQuery, useGetSpecsQuery } = apiSlice

// Pizzas selectors
export const selectPizzasResult = apiSlice.endpoints.getPizzas.select()
export const selectPizzasData = createSelector(
    selectPizzasResult,
    pizzasResult => pizzasResult.data
)
export const { selectIds: selectPizzaIds, selectById: selectPizzaById } =
    pizzasAdapter.getSelectors((state: RootState) => selectPizzasData(state) ?? pizzaInitialState)
export const selectFilteredPizzaIds = createSelector(selectPizzaIds, ids => ids)

// Specs selectors
export const selectSpecsResult = apiSlice.endpoints.getSpecs.select()
export const selectSpecsData = createSelector(selectSpecsResult, specsResult => specsResult.data)
export const { selectById: selectSpecById } = specsAdapter.getSelectors(
    (state: RootState) => selectSpecsData(state) ?? specsInitialState
)
