export interface IPizzaType {
    id: string
    currencySign: string
    description: string
    image: string
    name: string
    popularityPoint: number
    staticPrice: number
    doughPriceUp: number
    sizePriceUp: number
    price: number
    specId: string
    type: string
}
export interface ISpecType {
    id: string
    doughTypes: IDoughType[]
    sizes: ISize[]
    chosenDoughType: string
    chosenSize: number
    pizzaId: string
}
export interface IDoughType {
    id: string
    type: string
    priceUp: number
}
export interface ISize {
    id: string
    size: number
    priceUp: number
    measurement: string
}
