import React, { FC } from 'react'
import { AddToCartButton } from '../../components/AddToCartButton/AddToCartButton'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { selectPizzaById } from '../api/apiSlice'
import { RootState } from '../store/store'
import { PizzaSpecsButtons } from './PizzaSpecsButtons'

interface PizzaCardPropsType {
    id: EntityId
}

interface PizzaType {
    currencySign: string
    description: string
    id: string
    image: string
    name: string
    popularityPoint: number
    price: number
    specId: string
    type: string
}

export const PizzaCard: FC<PizzaCardPropsType> = ({ id }) => {
    const pizza = useSelector((state: RootState) => selectPizzaById(state, id)) as PizzaType
    const {
        image: imageLink,
        name,
        price,
        type: pizzaType,
        currencySign,
        popularityPoint,
        specId,
    } = pizza

    return (
        <div className="pizza-block">
            <img className="pizza-block__image" src={imageLink} alt="Pizza" />
            <h4 className="pizza-block__title">{name}</h4>
            <PizzaSpecsButtons id={specId} />
            <div className="pizza-block__data">
                <p>
                    Type: <b>{pizzaType}</b>
                </p>
                <br />
                <p>
                    Popularity point:<b> {popularityPoint}</b>
                </p>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">
                    <small>from</small> {currencySign}
                    {price}{' '}
                </div>
                <AddToCartButton />
            </div>
        </div>
    )
}
