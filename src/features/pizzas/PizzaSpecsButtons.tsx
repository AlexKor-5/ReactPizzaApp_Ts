import React, { Dispatch, FC, SetStateAction, useState, ReactNode } from 'react'
import { selectSpecById, useGetSpecsQuery } from '../api/apiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

interface SpecType {
    id: string
    doughTypes: DoughTypesType[]
    sizes: object[]
}

interface DoughTypesType {
    id: string
    type: string
    priceUp: number
}

interface PizzaSpecsButtonsPropsType {
    id: string
    increasePrice: Dispatch<SetStateAction<number>>
    currentPrice: number
}

interface ClickOnDoughTypeButtonType {
    item: { id: string; priceUp: number; type: string }
    increasePrice: Dispatch<SetStateAction<number>>
    currentPrice: number
    setChosenDoughTypeBtn: Dispatch<SetStateAction<string>>
}

export const PizzaSpecsButtons: FC<PizzaSpecsButtonsPropsType> = ({
    id,
    increasePrice,
    currentPrice,
}) => {
    const { isLoading, isSuccess, isError } = useGetSpecsQuery()
    const spec = useSelector((state: RootState) => selectSpecById(state, id)) as SpecType
    const [doughTypeCurrent, setDoughTypeCurrent] = useState<string>('')
    const [chosenDoughTypeBtn, setChosenDoughTypeBtn] = useState<string>('Thin')

    const handleClickOnDoughTypeButton = (object: ClickOnDoughTypeButtonType): void => {
        const { item, currentPrice, setChosenDoughTypeBtn, increasePrice } = object
        setChosenDoughTypeBtn(item.type)
        setDoughTypeCurrent(item.id)
        increasePrice(currentPrice)
        increasePrice(prev => prev + item.priceUp)
    }

    const runDoughTypeButtons = (spec: SpecType): ReactNode => {
        return spec.doughTypes.map((item: DoughTypesType, index: number) => {
            return (
                <li
                    key={index}
                    className={
                        chosenDoughTypeBtn === item.type ?? doughTypeCurrent === item.id
                            ? 'active'
                            : ''
                    }
                >
                    <div
                        role="button"
                        onClick={() =>
                            handleClickOnDoughTypeButton({
                                item,
                                increasePrice,
                                currentPrice,
                                setChosenDoughTypeBtn,
                            })
                        }
                        onKeyPress={f => f}
                        tabIndex={0}
                    >
                        {item.type}
                    </div>
                </li>
            )
        })
    }

    return isLoading ? (
        <div className="mooLoader">
            <ClipLoader loading={isLoading} size={30} color={'#fe5f1e'} />
        </div>
    ) : isSuccess ? (
        <div className="pizza-block__selector">
            <ul>{runDoughTypeButtons(spec)}</ul>
            <ul>
                <li className="active">26 sm.</li>
                <li>30 sm.</li>
                <li>40 sm.</li>
            </ul>
        </div>
    ) : isError ? (
        <div>{'Error ...'}</div>
    ) : null
}
