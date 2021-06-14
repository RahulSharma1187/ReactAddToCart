export const reducer = (state, action) => {
    if(action.type === "REMOVE_ITEM"){
        return{
            ...state,
            item: state.item.filter((curntElem)=> {
                return(
                    curntElem.id !== action.payload
                )
            })
        }
    }

    if(action.type === "CLEAR_CART"){
        return{...state, item:[]}
    }

    if(action.type === "INCREMENT"){
        const updatedItem =  state.item.map((crntElem) => {
            if(crntElem.id === action.payload){
                return{...crntElem , quantity: crntElem.quantity + 1}
            }
            return crntElem;
        })
        return {...state, item: updatedItem }
    }

    if(action.type === "DECREMENT"){
        const updatedItem = state.item.map((crntElem) => {
            if(crntElem.id === action.payload){
                return{...crntElem , quantity: crntElem.quantity - 1}                
            }
            return crntElem;
        }).filter((curElem) => {
            return curElem.quantity !== 0 
        })
        return {...state, item: updatedItem }   
    }

    if(action.type === "GET_TOTAL"){
        let {totalItem, totalAmount} = state.item.reduce((accum, curval) => {
            let { quantity, price } = curval;
            let updatedTotalAmount = price * quantity;
            accum.totalAmount += updatedTotalAmount;
            accum.totalItem += quantity;
            return accum;
        }, {
            totalItem: 0,
            totalAmount: 0,
        });
        return { ...state, totalItem, totalAmount};
    }

    return state 
}