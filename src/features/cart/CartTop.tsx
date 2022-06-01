import React, { FC } from 'react'
import { FaOpencart, FaTrashAlt } from 'react-icons/fa'

export const CartTop: FC = () => {
    return (
        <div className="cart__top">
            <div className={'cart__imageAndTitle'}>
                <FaOpencart size={'50px'} />
                <h2 className="content__title">
                    <span>My cart</span>
                </h2>
            </div>
            <div className="cart__clear">
                <FaTrashAlt size={'20px'} />
                <span>Clean cart</span>
            </div>
        </div>
    )
}
