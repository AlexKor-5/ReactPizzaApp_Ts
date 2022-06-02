import React, { FC } from 'react'

import { PizzaCard } from './PizzaCard'
import { PizzaTags } from './PizzaTags'
import { PizzaSorting } from './PizzaSorting'
import { useGetPizzasQuery } from '../api/apiSlice'
import MoonLoader from 'react-spinners/MoonLoader'
// import { useDispatch } from 'react-redux'
// import {loadedPizzas} from "../reducers/pizzaSlice"

export const PizzaHomePage: FC = () => {
    // const dispatch = useDispatch()
    const { data: pizzas = [], isLoading, isSuccess, isError } = useGetPizzasQuery()
    // console.log(pizzas);

    let contentCards

    if (isLoading) {
        contentCards = <MoonLoader loading={isLoading} size={100} color={'#fe5f1e'} />
    } else if (isSuccess) {
        console.log(pizzas)
        // dispatch(loadedPizzas(pizzas))
        contentCards = <PizzaCard />
    } else if (isError) {
        contentCards = <div>{'Error ...'}</div>
    }

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <PizzaTags />
                    <PizzaSorting />
                </div>

                <h2 className="content__title">All pizzas</h2>

                <div className="content__items">{contentCards}</div>
            </div>
        </div>
    )
}
