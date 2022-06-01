import React, { FC } from 'react'

export const CartBottom: FC = () => {
    return (
        <div className="cart__bottom">
            <div className="cart__bottom-details">
                <span>
                    {' '}
                    Pizzas amount: <b>x3</b>{' '}
                </span>
                <span>
                    {' '}
                    Total price: <b>$150</b>{' '}
                </span>
            </div>
            <div className="cart__bottom-buttons">
                <a href="/" className="button button--outline button--add go-back-btn">
                    <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 13L1 6.93015L6.86175 1"
                            stroke="#D3D3D3"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span>Back</span>
                </a>
                <div className="button pay-btn">
                    <span>Order now</span>
                </div>
            </div>
        </div>
    )
}
