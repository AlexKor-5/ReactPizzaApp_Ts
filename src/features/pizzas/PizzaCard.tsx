import React, { FC } from 'react'
import { AddToCartButton } from '../../components/AddToCartButton/AddToCartButton'

export const PizzaCard: FC = () => {
    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                alt="Pizza"
            />
            <h4 className="pizza-block__title">Pizza name</h4>
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
                    Type: <b>With meat</b>
                </p>
                <br />
                <p>
                    Popularity point:<b> 98</b>
                </p>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">
                    <small>from</small> $49{' '}
                </div>
                <AddToCartButton />
            </div>
        </div>
    )
}
