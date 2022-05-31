import { createSlice,createEntityAdapter} from '@reduxjs/toolkit'

const pizzasAdapter = createEntityAdapter()
const initialState = pizzasAdapter.getInitialState({})
interface PizzaResponse {
    id:string,
    name:string,
    image:string,
    doughType:string,
    size:number,
    price:number,
    currencySign:string,
    popularityPoint:number,
    type:string
}
interface PayloadAction{
    type:string,
    payload:string|number|object|object[]
}

const pizzaSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        loadedPizzas(state,action){
            // pizzasAdapter.setAll(state, action.payload)
            // console.log(state);
            // action.payload.map((pizza:PizzaResponse)=>{
            //     state.ids.push(pizza.id)
            // })
        },
        changeDoughType(state, action: PayloadAction) {
            console.log(state)
        },
    },
})
export const { loadedPizzas,changeDoughType } = pizzaSlice.actions
export default pizzaSlice.reducer