export const generateOneSpec = (
    arrDoughsFun: () => object[],
    arrSizeFun: () => object[],
    defaultValues: { doughType: string; size: number }
): object => {
    return {
        doughTypes: arrDoughsFun(),
        sizes: arrSizeFun(),
        chosenDoughType: defaultValues.doughType,
        chosenSize: defaultValues.size,
    }
}
