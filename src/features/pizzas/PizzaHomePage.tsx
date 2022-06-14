import React, { FC, ReactNode } from 'react'
import { PizzaCard } from './PizzaCard'
import { PizzaTags } from './PizzaTags'
import { PizzaSorting } from './PizzaSorting'
import { selectFilteredPizzaIds, useGetPizzasQuery } from '../api/apiSlice'
import MoonLoader from 'react-spinners/MoonLoader'
import { useSelector } from 'react-redux'

export const PizzaHomePage: FC = () => {
    const { data, isLoading, isSuccess, isError } = useGetPizzasQuery()
    const pizzasIds = useSelector(selectFilteredPizzaIds)

    const showContent = (isLoading: boolean, isSuccess: boolean, isError: boolean): ReactNode => {
        return isLoading ? (
            <MoonLoader loading={isLoading} size={100} color={'#fe5f1e'} />
        ) : isSuccess ? (
            pizzasIds.map((id) => <PizzaCard id={id} key={id} />)
        ) : isError ? (
            <div>{'Error ...'}</div>
        ) : null
    }

    // console.log(data)

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <PizzaTags />
                    <PizzaSorting />
                </div>

                <h2 className="content__title">All pizzas</h2>

                <div className="content__items">{showContent(isLoading, isSuccess, isError)}</div>
            </div>
        </div>
    )
}
