import React, { FC } from 'react'

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
                        <div className="button button--outline button--add">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"
                                />
                            </svg>
                            <span>Add to cart</span>
                            <i>2</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
