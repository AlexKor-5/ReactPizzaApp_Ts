import { randomFromArray } from './randomFromArray'
import { faker } from '@faker-js/faker'

export const generateOnePizza = (name: string, image: string, specId: object): object => {
    const singlePrice = randomFromArray([26, 30, 40, 50, 99, 89, 59])()
    return {
        name,
        image,
        staticPrice: singlePrice,
        doughPriceUp: 0,
        sizePriceUp: 0,
        price: singlePrice,
        currencySign: '$',
        popularityPoint: randomFromArray([
            26, 30, 40, 100, 200, 444, 323, 123, 543, 30, 54, 324, 44, 444, 222, 333,
        ])(),
        type: randomFromArray(['With meat', 'Vegan', 'Grill', 'Spicy'])(),
        description: [...Array(5)]
            .map(() => faker.commerce.productDescription())
            .reduce((accum, current) => (accum += current), ''),
        specId,
    }
}
