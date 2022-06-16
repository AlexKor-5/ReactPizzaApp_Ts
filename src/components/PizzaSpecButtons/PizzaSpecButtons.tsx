import React, { FC, useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { DoughButtons } from './subComponents/DoughButtons'
import { SizeButtons } from './subComponents/SizeButtons'
import { ISpecType } from '../../types/pizzaTypes'

interface IPizzaSpecButtonsProps {
    data: ISpecType[] | undefined
    requestLifeCycle: API_RequestLifeCycle
}
interface API_RequestLifeCycle {
    isLoading: boolean
    isFetching: boolean
    isSuccess: boolean
    isError: boolean
}

export const PizzaSpecButtons: FC<IPizzaSpecButtonsProps> = ({ data, requestLifeCycle }) => {
    const { isLoading, isFetching, isSuccess, isError } = requestLifeCycle

    const [single]: (ISpecType | undefined)[] | undefined = data ?? []

    return isLoading || isFetching ? (
        <div className="mooLoader">
            <ClipLoader loading={isLoading || isFetching} size={30} color={'#fe5f1e'} />
        </div>
    ) : isSuccess ? (
        <div className="pizza-block__selector">
            <ul>
                <DoughButtons specObject={single} />
            </ul>
            <ul>
                <SizeButtons />
            </ul>
        </div>
    ) : isError ? (
        <div>{'Error ...'}</div>
    ) : null
}
