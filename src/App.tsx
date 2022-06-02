import React, { FC } from 'react'
import './scss/app.scss'
import { NavBar } from './components/NavBar/NavBar'
import { PizzaHomePage } from './features/pizzas/PizzaHomePage'
import { CartPage } from './features/cart/CartPage'
import { PizzaSinglePage } from './features/pizzas/PizzaSinglePage'

export const App: FC = () => {
    return (
        <div className="wrapper">
            <NavBar />
            <PizzaHomePage />
            {/*<CartPage />*/}
            {/*<PizzaSinglePage />*/}
        </div>
    )
}
