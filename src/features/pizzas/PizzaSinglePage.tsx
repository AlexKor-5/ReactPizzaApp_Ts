import React, { FC, ReactNode } from 'react'
import { AddToCartButton } from '../../components/AddToCartButton/AddToCartButton'
import { useParams } from 'react-router-dom'
import { useGetPizzaQuery } from '../api/apiSlice'
import MoonLoader from 'react-spinners/MoonLoader'
import { PizzaType } from '../../types/pizzaTypes'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

export const PizzaSinglePage: FC = () => {
    const { pizzaId } = useParams()
    const { data, isLoading, isSuccess, isError, error } = useGetPizzaQuery(pizzaId)

    const displayPizzaData = (
        data: PizzaType,
        error: FetchBaseQueryError | SerializedError | undefined
    ): ReactNode => {
        return isLoading ? (
            <MoonLoader loading={isLoading} size={100} color={'#fe5f1e'} />
        ) : isSuccess ? (
            <>
                <div className="pizzaSingle__image">
                    <img src={data.image} alt="Pizza" />
                </div>
                <div className="pizzaSingle__text">
                    <div className="pizzaSingle__title">
                        <h4>{data.name}</h4>
                    </div>

                    <div className="pizza-block__selector">
                        <ul>
                            <li className="active">Thin</li>
                            <li>Conventional</li>
                        </ul>
                        <ul>
                            <li className="active">26 sm.</li>
                            <li>30 sm.</li>
                            <li>40 sm.</li>
                        </ul>
                    </div>

                    <div className="pizza-block__data">
                        <p>
                            Type: <b>{data.type}</b>
                        </p>
                        <br />
                        <p>
                            Popularity point:<b>{data.popularityPoint}</b>
                        </p>
                        <br />
                    </div>

                    <div className="pizzaSingle__description">
                        <h4>Description: </h4>
                        <p>{data.description}</p>
                    </div>

                    <div className="pizzaSingle__bottom">
                        <div className="pizza-block__bottom">
                            <div className="pizza-block__price">
                                <small>from</small> {data.currencySign}
                                {data.price}{' '}
                            </div>
                            <AddToCartButton />
                        </div>
                    </div>
                </div>
            </>
        ) : isError ? (
            <>
                <div>{'Error ...'}</div>
                <div>
                    <span>{JSON.stringify(error, undefined, 2)}</span>
                </div>
            </>
        ) : null
    }

    return <div className="pizzaSingle">{displayPizzaData(data, error)}</div>
}
