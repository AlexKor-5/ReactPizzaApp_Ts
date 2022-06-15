import React, { FC, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { DoughButtons } from './subComponents/DoughButtons'
import { SizeButtons } from './subComponents/SizeButtons'
import { ISpecType } from '../../types/pizzaTypes'

interface IPizzaSpecButtonsProps {
    specObject: ISpecType
    requestLifeCycle: API_RequestLifeCycle
}
interface API_RequestLifeCycle {
    isLoading: boolean
    isFetching: boolean
    isSuccess: boolean
    isError: boolean
}

export const PizzaSpecButtons: FC<IPizzaSpecButtonsProps> = ({ specObject, requestLifeCycle }) => {
    const { isLoading, isFetching, isSuccess, isError } = requestLifeCycle

    return isLoading || isFetching ? (
        <div className="mooLoader">
            <ClipLoader loading={isLoading || isFetching} size={30} color={'#fe5f1e'} />
        </div>
    ) : isSuccess ? (
        <div className="pizza-block__selector">
            <ul>
                <DoughButtons specObject={specObject} />
            </ul>
            <ul>
                <SizeButtons />
            </ul>
        </div>
    ) : isError ? (
        <div>{'Error ...'}</div>
    ) : null
}
