import React, { FC } from 'react'
import { useGetSpecQuery } from '../api/apiSlice'
import { PizzaSpecButtons } from '../../components/PizzaSpecButtons/PizzaSpecButtons'

interface IPizzaOneSpecProps {
    specId: string
}

export const PizzaOneSpec: FC<IPizzaOneSpecProps> = ({ specId }) => {
    const { data, ...requestLifeCycle } = useGetSpecQuery(specId)
    // console.log('one spe query = ', data)
    return (
        <>
            <h1>One spec query!</h1>
            <h3>{specId}</h3>
            <PizzaSpecButtons data={[data]} requestLifeCycle={requestLifeCycle} />
        </>
    )
}
