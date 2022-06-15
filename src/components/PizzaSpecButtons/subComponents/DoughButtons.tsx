import React, { FC, useState } from 'react'
import { IDoughType, ISpecType } from '../../../types/pizzaTypes'

interface IDoughButtonsProps {
    specObject: ISpecType
}

export const DoughButtons: FC<IDoughButtonsProps> = ({ specObject = {} }) => {
    const [defaultDoughTypeBtn, setDefaultDoughTypeBtn] = useState<string>('')
    const [doughTypeTarget, setDoughTypeTarget] = useState<string>('')
    if (Object.values(specObject).length === 0) return <h1>No Dough Options</h1>

    const { doughTypes, id: specID } = specObject

    return (
        <>
            {doughTypes?.map((btn: IDoughType) => {
                return (
                    <li
                        className={
                            defaultDoughTypeBtn === btn.type || doughTypeTarget === btn.id
                                ? 'active'
                                : ''
                        }
                        key={btn.id}
                    >
                        <div role="button" onKeyPress={(f) => f} tabIndex={0} onClick={(f) => f}>
                            {btn.type}
                        </div>
                    </li>
                )
            })}
        </>
    )
}
