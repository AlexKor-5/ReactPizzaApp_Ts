import React, { FC } from 'react'
import { useGetSpecQuery } from '../api/apiSlice'

interface IPizzaOneSpecProps {
    specId: string
}

export const PizzaOneSpec: FC<IPizzaOneSpecProps> = ({ specId }) => {
    const { data } = useGetSpecQuery(specId)
    console.log('one spe query = ', data)
    return (
        <>
            <h1>One spec query!</h1>
            <h3>{specId}</h3>
        </>
    )
}
