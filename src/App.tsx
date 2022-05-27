import React, { FC } from 'react'
import './scss/app.scss'
import { NavBar } from './components/NavBar/NavBar'
import { PizzaHomePage } from './features/pizzas/PizzaHomePage'

export const App: FC = () => {
    return (
        <div className="wrapper">
            <NavBar />
            <PizzaHomePage />
        </div>
    )
}
