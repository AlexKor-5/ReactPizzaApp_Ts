import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit'
import { FetchArgs } from '@reduxjs/toolkit/query'
import { RootState } from '../store/store'
import { IPizzaType, ISpecType } from '../../types/pizzaTypes'

const pizzasAdapter = createEntityAdapter<IPizzaType>()
const pizzaInitialState = pizzasAdapter.getInitialState()

interface IQueryParamProps {
    specID: string
    gottenType: string
}

interface IChangeSizeProps {
    specID: string
    gottenSize: number
}

interface IQueryChangePriceProps {
    pizzaId: string
    priceObj: {
        priceUp: number
        type: string
    }
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '' }),
    tagTypes: ['Pizza', 'Spec'],
    endpoints: (builder) => ({
        getPizzas: builder.query<EntityState<IPizzaType>, void>({
            query: () => '/pizzas',
            transformResponse: (responseData: IPizzaType[]) => {
                return pizzasAdapter.setAll(pizzaInitialState, responseData)
            },
            providesTags: ['Pizza'],
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
                    apiSlice.util.updateQueryData(
                        'getSpecs',
                        undefined,
                        (draft: ISpecType[]) => {
                            const singleSpec = draft.find(
                                (oneSpec) => oneSpec.id === obj.specID
                            )
                            if (singleSpec) singleSpec.chosenDoughType = obj.gottenType
                        }
                    )
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        changeChosenSize: builder.mutation<string | FetchArgs, IChangeSizeProps>({
            query: (obj: IChangeSizeProps) => ({
                url: `/specs/${obj.specID}/size`,
                method: `PATCH`,
                body: obj.gottenSize,
            }),
            invalidatesTags: ['Spec'],
            async onQueryStarted(obj, { dispatch, queryFulfilled }) {
                const patchResult2 = dispatch(
                    apiSlice.util.updateQueryData(
                        'getSpecs',
                        undefined,
                        (draft: ISpecType[]) => {
                            const singleSpec = draft.find(
                                (oneSpec) => oneSpec.id === obj.specID
                            )
                            if (singleSpec) singleSpec.chosenSize = obj.gottenSize
                        }
                    )
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult2.undo()
                }
            },
        }),
        changePrice: builder.mutation<string | FetchArgs, IQueryChangePriceProps>({
            query: (obj: IQueryChangePriceProps) => ({
                url: `/pizzas/${obj.pizzaId}/priceUp`,
                method: `PATCH`,
                body: obj.priceObj,
            }),
            invalidatesTags: ['Pizza'],
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
    useChangeChosenSizeMutation,
} = apiSlice

// Pizzas selectors
export const selectPizzasResult = apiSlice.endpoints.getPizzas.select()
export const selectPizzasData = createSelector(
    selectPizzasResult,
    (pizzasResult) => pizzasResult.data
)
export const { selectIds: selectPizzaIds, selectById: selectPizzaById } =
    pizzasAdapter.getSelectors(
        (state: RootState) => selectPizzasData(state) ?? pizzaInitialState
    )
export const selectFilteredPizzaIds = createSelector(selectPizzaIds, (ids) => ids)
