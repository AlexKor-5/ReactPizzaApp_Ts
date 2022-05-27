import React, { FC } from 'react'
export const PizzaTags: FC = () => {
    return (
        <div className="categories">
            <ul>
                <li className="active">All</li>
                <li>With meat</li>
                <li>Vegan</li>
                <li>Grill</li>
                <li>Spicy</li>
            </ul>
        </div>
    )
}
