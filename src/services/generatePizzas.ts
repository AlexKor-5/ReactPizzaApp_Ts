import { randomFromArray } from './randomFromArray'
import { nanoid } from '@reduxjs/toolkit'
import { faker } from '@faker-js/faker'

export const generatePizzas = (pizzaImages: string[], pizzaNames: string[]) => {
    return pizzaImages.reduce((accum: object[], current: string, index: number) => {
        return pizzaImages.length === pizzaNames.length
            ? [
                  ...accum,
                  {
                      id: nanoid(),
                      name: pizzaNames[index],
                      image: current,
                      doughType: randomFromArray(['Thin', 'Convencional'])(),
                      size: randomFromArray([26, 30, 40])(),
                      price: randomFromArray([26, 30, 40, 50, 99, 89, 59])(),
                      currencySign: '$',
                      popularityPoint: randomFromArray([
                          26, 30, 40, 100, 200, 444, 323, 123, 543, 30, 54, 324, 44, 444, 222, 333,
                      ])(),
                      type: randomFromArray(['With meat', 'Vegan', 'Grill', 'Spicy'])(),
                      description: [...Array(5)]
                          .map(() => faker.commerce.productDescription())
                          .reduce((accum, current) => (accum += current), ''),
                  },
              ]
            : []
    }, [])
}
