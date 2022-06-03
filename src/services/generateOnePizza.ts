import { randomFromArray } from './randomFromArray'
import { faker } from '@faker-js/faker'

export const generateOnePizza = (name: string, image: string, spec: object): object => {
    return {
        name,
        image,
        price: randomFromArray([26, 30, 40, 50, 99, 89, 59])(),
        currencySign: '$',
        popularityPoint: randomFromArray([
            26, 30, 40, 100, 200, 444, 323, 123, 543, 30, 54, 324, 44, 444, 222, 333,
        ])(),
        type: randomFromArray(['With meat', 'Vegan', 'Grill', 'Spicy'])(),
        description: [...Array(5)]
            .map(() => faker.commerce.productDescription())
            .reduce((accum, current) => (accum += current), ''),
        spec,
    }
}
