import React, { FC } from 'react'
import './scss/app.scss'
import { NavBar } from './components/NavBar/NavBar'
import { PizzaHomePage } from './features/pizzas/PizzaHomePage'
import { CartPage } from './features/cart/CartPage'
import { PizzaSinglePage } from './features/pizzas/PizzaSinglePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App: FC = () => {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<PizzaHomePage />} />
                    <Route path="/pizzas/:pizzaId" element={<PizzaSinglePage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
