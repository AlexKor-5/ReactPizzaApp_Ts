export const generateOneSpec = (
    arrDoughsFun: () => object[],
    arrSizeFun: () => object[]
): object => {
    return {
        doughTypes: arrDoughsFun(),
        sizes: arrSizeFun(),
        pizza: '',
    }
}
