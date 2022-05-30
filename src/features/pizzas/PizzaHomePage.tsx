import React, { FC, useEffect } from 'react'

import { PizzaCard } from './PizzaCard'
import { PizzaTags } from './PizzaTags'
import { PizzaSorting } from './PizzaSorting'

export const PizzaHomePage: FC = () => {
    useEffect(()=>{
        fetch('/pizzas')
            .then(data=>data.json())
            .then(data=>console.log(data))
    })

    // console.log('home page render!')

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
