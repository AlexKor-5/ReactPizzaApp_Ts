export interface PizzaResponseType {
    id: string
    name: string
    image: string
    price: number
    currencySign: string
    popularityPoint: number
    type: string
    description: string
    specId: string
}

export interface SpecResponseType {
    id: string
    doughTypes: object[]
    sizes: object[]
    pizza: string
}
