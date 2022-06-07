import React, { FC } from 'react'
import { PizzaCard } from './PizzaCard'
import { PizzaTags } from './PizzaTags'
import { PizzaSorting } from './PizzaSorting'
import { selectFilteredPizzaIds, useGetPizzasQuery } from '../api/apiSlice'
import MoonLoader from 'react-spinners/MoonLoader'
import { useSelector } from 'react-redux'

export const PizzaHomePage: FC = () => {
    const { isLoading, isSuccess, isError } = useGetPizzasQuery()
    const pizzasIds = useSelector(selectFilteredPizzaIds)

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <PizzaTags />
                    <PizzaSorting />
                </div>

                <h2 className="content__title">All pizzas</h2>

                <div className="content__items">
                    {isLoading ? (
                        <MoonLoader loading={isLoading} size={100} color={'#fe5f1e'} />
                    ) : isSuccess ? (
                        pizzasIds.map(id => <PizzaCard id={id} key={id} />)
                    ) : isError ? (
                        <div>{'Error ...'}</div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
