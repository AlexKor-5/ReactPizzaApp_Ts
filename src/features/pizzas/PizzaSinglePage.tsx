import React, { FC, ReactNode } from 'react'
import { AddToCartButton } from '../../components/AddToCartButton/AddToCartButton'
import { useParams } from 'react-router-dom'
import { useGetPizzaQuery } from '../api/apiSlice'
import MoonLoader from 'react-spinners/MoonLoader'
import { IPizzaType } from '../../types/pizzaTypes'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'
// import { PizzaRequestSpecsButtons } from './PizzaRequestSpecsButtons'
import { PizzaOneSpec } from './PizzaOneSpec'

export const PizzaSinglePage: FC = () => {
    const { pizzaId } = useParams()
    const { data, isLoading, isSuccess, isError, error } = useGetPizzaQuery(pizzaId)

    const displayPizzaData = (
        data: IPizzaType,
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

                    {/*<PizzaRequestSpecsButtons specId={data.specId} />*/}
                    <PizzaOneSpec specId={data.specId} />

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
