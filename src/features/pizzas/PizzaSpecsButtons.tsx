import React, { FC, MouseEventHandler, useMemo } from 'react'
import { useGetSpecsQuery } from '../api/apiSlice'
import ClipLoader from 'react-spinners/ClipLoader'

export const PizzaSpecsButtons: FC<{ id: string }> = ({ id }) => {
    // const handleClick: MouseEventHandler<HTMLLIElement> = event => {
    //     console.log(event)
    // }
    const { isLoading, isSuccess, isError } = useGetSpecsQuery()

    return isLoading ? (
        <div className="mooLoader">
            <ClipLoader loading={isLoading} size={30} color={'#fe5f1e'} />
        </div>
    ) : isSuccess ? (
        <div className="pizza-block__selector">
            <ul>
                <li className="active">Thin</li>
                <li>Conventional</li>
            </ul>
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
