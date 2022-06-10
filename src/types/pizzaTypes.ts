export interface PizzaType {
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
export interface SpecType {
    id: string
    doughTypes: object[]
    sizes: object[]
    chosenDoughType: string
    chosenSize: number
    pizza: string
}
