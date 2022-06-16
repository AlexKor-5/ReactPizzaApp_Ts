import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit'
import { FetchArgs } from '@reduxjs/toolkit/query'
import { RootState } from '../store/store'
import { IPizzaType, ISpecType } from '../../types/pizzaTypes'

const pizzasAdapter = createEntityAdapter()
const pizzaInitialState = pizzasAdapter.getInitialState()

// const specsAdapter = createEntityAdapter()
// const specsInitialState = specsAdapter.getInitialState()

interface IQueryParamProps {
    specID: string
    gottenType: string
}

interface IQueryChangePriceProps {
    pizzaId: string
    priceUp: number
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: ['Pizza', 'Spec'],
    endpoints: (builder) => ({
        getPizzas: builder.query<EntityState<unknown>, void>({
            query: () => '/pizzas',
            transformResponse: (responseData: IPizzaType[]) => {
                return pizzasAdapter.setAll(pizzaInitialState, responseData)
            },
        }),
        getPizza: builder.query({
            query: (pizzaId) => `/pizzas/${pizzaId}`,
            providesTags: ['Pizza'],
        }),
        getSpecs: builder.query<ISpecType[], void>({
            query: () => '/specs',
        }),
        getSpec: builder.query({
            query: (specId) => `/specs/${specId}`,
            providesTags: ['Spec'],
        }),
        changeChosenDoughType: builder.mutation<string | FetchArgs, IQueryParamProps>({
            query: (obj: IQueryParamProps) => ({
                url: `/specs/${obj.specID}/doughType`,
                method: `PATCH`,
                body: obj.gottenType,
            }),
            invalidatesTags: ['Spec'],
            async onQueryStarted(obj, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getSpecs', undefined, (draft: ISpecType[]) => {
                        const singleSpec = draft.find((oneSpec) => oneSpec.id === obj.specID)
                        if (singleSpec) singleSpec.chosenDoughType = obj.gottenType
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        changePrice: builder.mutation<string | FetchArgs, IQueryChangePriceProps>({
            query: (obj: IQueryChangePriceProps) => ({
                url: `/pizzas/${obj.pizzaId}/priceUp`,
                method: `PATCH`,
                body: obj.priceUp,
            }),
            invalidatesTags: ['Pizza'],
            async onQueryStarted(obj, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getPizzas', undefined, (draft) => {
                        const singlePizza = draft.entities[obj.pizzaId]
                        // console.log('singlePizza = ', singlePizza)
                        // if (singlePizza) singlePizza.price = singlePizza.staticPrice + obj.priceUp
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
    }),
})
// Queries
export const {
    useGetPizzasQuery,
    useGetPizzaQuery,
    useGetSpecsQuery,
    useGetSpecQuery,
    useChangeChosenDoughTypeMutation,
    useChangePriceMutation,
} = apiSlice

// Pizzas selectors
export const selectPizzasResult = apiSlice.endpoints.getPizzas.select()
export const selectPizzasData = createSelector(
    selectPizzasResult,
    (pizzasResult) => pizzasResult.data
)
export const { selectIds: selectPizzaIds, selectById: selectPizzaById } =
    pizzasAdapter.getSelectors((state: RootState) => selectPizzasData(state) ?? pizzaInitialState)
export const selectFilteredPizzaIds = createSelector(selectPizzaIds, (ids) => ids)
