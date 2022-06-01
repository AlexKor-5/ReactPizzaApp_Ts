import React, { FC } from 'react'
import { CartItem } from './CartItem'
import { CartTop } from './CartTop'
import { CartBottom } from './CartBottom'

export const CartPage: FC = () => {
    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart">
                    <CartTop />
                    <div className="content__items">
                        <CartItem />
                        <CartItem />
                    </div>
                    <CartBottom />
                </div>
            </div>
        </div>
    )
}
