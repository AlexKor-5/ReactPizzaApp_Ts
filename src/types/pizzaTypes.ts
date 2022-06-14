export interface IPizzaType {
    id: string
    currencySign: string
    description: string
    image: string
    name: string
    popularityPoint: number
    price: number
    specId: string
    type: string
}
export interface ISpecType {
    id: string
    doughTypes: IDoughType[]
    sizes: object[]
    chosenDoughType: string
    chosenSize: number
    pizzaId: string
}
export interface IDoughType {
    id: string
    type: string
    priceUp: number
}
