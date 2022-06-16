import React, { FC, useEffect, useState } from 'react'
import { IDoughType, ISpecType } from '../../../types/pizzaTypes'
import {
    useChangeChosenDoughTypeMutation,
    useChangePriceMutation,
} from '../../../features/api/apiSlice'

interface IDoughButtonsProps {
    specObject: ISpecType
}

export const DoughButtons: FC<IDoughButtonsProps> = ({ specObject }) => {
    const [defaultDough, setDefaultDough] = useState<string>('')
    const [changeChosenDoughType, { isLoading }] = useChangeChosenDoughTypeMutation()
    const [changePrice, { isLoading: isLoadingPriceChange }] = useChangePriceMutation()

    useEffect(() => {
        setDefaultDough(specObject?.chosenDoughType)
    }, [specObject])

    const handleClick = async (
        btnID: string,
        btnType: string,
        priceUp: number,
        specID: string,
        pizzaId: string
    ) => {
        if (btnType !== defaultDough) {
            if (!isLoading) {
                try {
                    await changeChosenDoughType({
                        specID,
                        gottenType: btnType,
                    }).unwrap()
                } catch (e) {
                    console.error('Failed to PATCH spec data: ', e)
                }
            }
            if (!isLoadingPriceChange) {
                try {
                    await changePrice({
                        pizzaId,
                        priceUp,
                    }).unwrap()
                } catch (e) {
                    console.error('Failed to PATCH price data: ', e)
                }
            }
        }
    }

    const runDoughButtons = (specObject: ISpecType) => {
        const { doughTypes, id: specID, pizzaId } = specObject
        return doughTypes?.map((btn: IDoughType) => {
            return (
                <li className={defaultDough === btn.type ? 'active' : ''} key={btn.id}>
                    <div
                        role="button"
                        onKeyPress={(f) => f}
                        tabIndex={0}
                        onClick={() => handleClick(btn.id, btn.type, btn.priceUp, specID, pizzaId)}
                    >
                        {btn.type}
                    </div>
                </li>
            )
        })
    }

    return (
        <>
            {Object.values(specObject).length === 0 ? (
                <h1>No Dough Options</h1>
            ) : (
                runDoughButtons(specObject)
            )}
        </>
    )
}
