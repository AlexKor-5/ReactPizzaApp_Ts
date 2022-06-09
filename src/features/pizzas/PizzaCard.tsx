import React, { FC, useState } from 'react'
import { AddToCartButton } from '../../components/AddToCartButton/AddToCartButton'
import { EntityId } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { selectPizzaById } from '../api/apiSlice'
import { RootState } from '../store/store'
import { PizzaSpecsButtons } from './PizzaSpecsButtons'
import { Link } from 'react-router-dom'
import { PizzaType } from '../../types/pizzaTypes'

interface PizzaCardPropsType {
    id: EntityId
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
    const [pizzaPrice, setPizzaPrice] = useState<number>(price)
    const [prevPizzaPrice, setPrevPizzaPrice] = useState<number>(price)

    return (
        <div className="pizza-block">
            <Link to={`pizzas/${pizza.id}`}>
                <img className="pizza-block__image" src={imageLink} alt="Pizza" />
                <h4 className="pizza-block__title">{name}</h4>
            </Link>
            <PizzaSpecsButtons
                id={specId}
                increasePrice={setPizzaPrice}
                currentPrice={prevPizzaPrice}
            />
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
                    {pizzaPrice}{' '}
                </div>
                <AddToCartButton />
            </div>
        </div>
    )
}
