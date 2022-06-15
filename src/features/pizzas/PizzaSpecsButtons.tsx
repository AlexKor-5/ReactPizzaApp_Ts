import React, {
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { useChangeChosenDoughTypeMutation, useGetSpecsQuery } from '../api/apiSlice'
import ClipLoader from 'react-spinners/ClipLoader'
import { IDoughType, ISpecType } from '../../types/pizzaTypes'

interface IPizzaSpecsButtonsProps {
    specId: string
    increasePrice?: Dispatch<SetStateAction<number>>
    staticPrice?: number
}

interface IRunDoughTypeButtonsProps {
    single: ISpecType
    doughTypeTarget: string
    defaultDoughTypeBtn: string
}

export const PizzaSpecsButtons: FC<IPizzaSpecsButtonsProps> = ({
    specId,
    increasePrice = (f) => f,
    staticPrice = 0,
}) => {
    const [defaultDoughTypeBtn, setDefaultDoughTypeBtn] = useState<string>('')
    const [doughTypeTarget, setDoughTypeTarget] = useState<string>('')

    const selector = useCallback((data: ISpecType[] | undefined, specId: string) => {
        return data?.filter((item) => {
            return item.id === specId
        })
    }, [])

    const { data, isLoading, isSuccess, isError, isFetching } = useGetSpecsQuery(undefined, {
        selectFromResult: (result) => ({
            ...result,
            data: selector(result?.data, specId),
        }),
    })
    const [single]: (ISpecType | undefined)[] | undefined = data ?? []

    // console.log('isLoading = ', isLoading)
    // console.log('isFetching = ', isFetching)

    useEffect(() => {
        setDefaultDoughTypeBtn(single?.chosenDoughType)
    }, [single])

    const [changeChosenDoughType] = useChangeChosenDoughTypeMutation()

    const handleClick = async (btnID: string, btnType: string, specID: string, priceUp: number) => {
        setDoughTypeTarget(btnID)
        setDefaultDoughTypeBtn('clear default value')
        increasePrice(staticPrice)
        increasePrice((prev) => prev + priceUp)
        if (btnType !== defaultDoughTypeBtn) {
            // console.log(btnType, specID)
            try {
                await changeChosenDoughType({
                    specID,
                    gottenType: btnType,
                }).unwrap()
            } catch (e) {
                console.error('Failed to post spec data: ', e)
            }
        }
    }
    // console.log(useChangeChosenDoughTypeMutation())

    const runDoughTypeButtons = (object: IRunDoughTypeButtonsProps): ReactNode => {
        const { doughTypes, id: specID } = object.single
        const { doughTypeTarget, defaultDoughTypeBtn } = object

        return doughTypes.map((btn: IDoughType) => {
            return (
                <li
                    className={
                        defaultDoughTypeBtn === btn.type || doughTypeTarget === btn.id
                            ? 'active'
                            : ''
                    }
                    key={btn.id}
                >
                    <div
                        role="button"
                        onKeyPress={(f) => f}
                        tabIndex={0}
                        onClick={() => handleClick(btn.id, btn.type, specID, btn.priceUp)}
                    >
                        {btn.type}
                    </div>
                </li>
            )
        })
    }

    return isLoading || isFetching ? (
        <div className="mooLoader">
            <ClipLoader loading={isLoading || isFetching} size={30} color={'#fe5f1e'} />
        </div>
    ) : isSuccess ? (
        <div className="pizza-block__selector">
            <ul>{runDoughTypeButtons({ single, doughTypeTarget, defaultDoughTypeBtn })}</ul>
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
//
// console.log('item = ', item)
// console.log('item.id = ', item.id)
// console.log('specId = ', specId)
