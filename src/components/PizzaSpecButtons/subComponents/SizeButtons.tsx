import React, { FC, useEffect, useState } from 'react'
import { ISpecType } from '../../../types/pizzaTypes'
import {
    useChangeChosenSizeMutation,
    useChangePriceMutation,
} from '../../../features/api/apiSlice'

interface ISizeButtonsProps {
    specObject: ISpecType
}

interface IHandleClickProps {
    size: number
    priceUp: number
    specID: string
    pizzaId: string
}

export const SizeButtons: FC<ISizeButtonsProps> = ({ specObject }) => {
    const [defaultSize, setDefaultSize] = useState<number | null>(null)
    const [changeChosenSize, { isLoading }] = useChangeChosenSizeMutation()
    const [changePrice, { isLoading: isLoadingPriceChange }] = useChangePriceMutation()

    useEffect(() => {
        setDefaultSize(specObject?.chosenSize)
    }, [specObject.chosenSize])

    const handleClick = async (obj: IHandleClickProps) => {
        const { size, priceUp, specID, pizzaId } = obj
        if (size !== defaultSize) {
            if (!isLoading) {
                try {
                    await changeChosenSize({
                        specID,
                        gottenSize: size,
                    }).unwrap()
                } catch (e) {
                    console.error('Failed to PATCH spec data: ', e)
                }
            }
            if (!isLoadingPriceChange) {
                try {
                    await changePrice({
                        pizzaId,
                        priceObj: { priceUp, type: 'size' },
                    }).unwrap()
                } catch (e) {
                    console.error('Failed to PATCH price data: ', e)
                }
            }
        }
    }

    const runSizeButtons = (specObject: ISpecType) => {
        const { sizes, pizzaId, id: specID } = specObject
        return sizes.map((item) => {
            return (
                <li key={item.id} className={defaultSize == item.size ? 'active' : ''}>
                    <div
                        role="button"
                        onKeyPress={(f) => f}
                        tabIndex={0}
                        onClick={() =>
                            handleClick({
                                size: item.size,
                                priceUp: item.priceUp,
                                specID,
                                pizzaId: pizzaId,
                            })
                        }
                    >
                        {item.size} {item.measurement}.
                    </div>
                </li>
            )
        })
    }

    return <>{runSizeButtons(specObject)}</>
}
