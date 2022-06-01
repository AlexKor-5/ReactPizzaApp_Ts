import React, { FC } from 'react'
import './scss/app.scss'
import { NavBar } from './components/NavBar/NavBar'
import { PizzaHomePage } from './features/pizzas/PizzaHomePage'
// import { CartPage } from './features/cart/CartPage'

export const App: FC = () => {
    return (
        <div className="wrapper">
            <NavBar />
            <PizzaHomePage />
            {/*<CartPage />*/}
        </div>
    )
}
