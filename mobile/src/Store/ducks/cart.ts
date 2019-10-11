

//Types
export const Types = {
    ADD_CART: "@ecommerce/ADD_CART"
}

//Actions
export const Actions = {
    add_cart: product => ({
        type: Types.ADD_CART,
        payload: product
    })
}

//Reducers
const INITIAL_STATE = {
    products: [],
    quantity: 0
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.ADD_CART:

            return { ...state, products: [...state.products, action.product] }
        default:
            return state;
    }
}

export default cartReducer;
