import React, { FC, useCallback } from 'react'
import { useGetSpecsQuery } from '../api/apiSlice'

import { ISpecType } from '../../types/pizzaTypes'
import { PizzaSpecButtons } from '../../components/PizzaSpecButtons/PizzaSpecButtons'

interface IPizzaSpecsButtonsProps {
    specId: string
}

export const PizzaRequestSpecsButtons: FC<IPizzaSpecsButtonsProps> = ({ specId }) => {
    const selector = useCallback((data: ISpecType[] | undefined, specId: string) => {
        return data?.filter((item) => {
            return item.id === specId
        })
    }, [])

    const { data, ...requestLifeCycle } = useGetSpecsQuery(undefined, {
        selectFromResult: (result) => ({
            ...result,
            data: selector(result?.data, specId),
        }),
    })

    return <PizzaSpecButtons data={data} requestLifeCycle={requestLifeCycle} />
}
