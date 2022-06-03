import React, { FC } from 'react'
import { AddToCartButton } from '../../components/AddToCartButton/AddToCartButton'

export const PizzaSinglePage: FC = () => {
    return (
        <div className="pizzaSingle">
            <div className="pizzaSingle__image">
                <img
                    src="https://dodopizza-a.akamaihd.net/static/Img/Products/2ac448e39ba24623a33c1d8d50b69ef8_584x584.jpeg"
                    alt="Pizza"
                />
            </div>
            <div className="pizzaSingle__text">
                <div className="pizzaSingle__title">
                    <h4>Pizza name</h4>
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
                        Type: <b>With meat</b>
                    </p>
                    <br />
                    <p>
                        Popularity point:<b> 98</b>
                    </p>
                    <br />
                </div>

                <div className="pizzaSingle__description">
                    <h4>Description: </h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                        accusantium commodi ducimus harum iusto minima omnis quis quo voluptates! A
                        aspernatur eius enim fuga ipsa, minima neque quod rerum tempore? A alias
                        aliquam architecto aut doloremque eos facere facilis illo obcaecati possimus
                        quam, rem repellat soluta tempora totam vitae voluptas!
                    </p>
                </div>

                <div className="pizzaSingle__bottom">
                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price">
                            <small>from</small> $49{' '}
                        </div>
                        <AddToCartButton />
                    </div>
                </div>
            </div>
        </div>
    )
}
