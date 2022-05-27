import React, { FC } from 'react'

import { PizzaCard } from './PizzaCard'
import { PizzaTags } from './PizzaTags'
import { PizzaSorting } from './PizzaSorting'

export const PizzaHomePage: FC = () => {
    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <PizzaTags />
                    <PizzaSorting />
                </div>

                <h2 className="content__title">All pizzas</h2>

                <div className="content__items">
                    <PizzaCard />
                </div>
            </div>
        </div>
    )
}
