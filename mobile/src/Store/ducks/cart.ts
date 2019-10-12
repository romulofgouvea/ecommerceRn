//Types
export const Types = {
    ADD_CART: "@ecommerce/ADD_CART",
    REMOVE_CART: "@ecommerce/REMOVE_CART"
};

//Actions
export const Actions = {
    add_cart(product) {
        return { type: Types.ADD_CART, product };
    },
    remove_cart(product) {
        return { type: Types.REMOVE_CART, product };
    }
};

//Reducers
const INITIAL_STATE = {
    products: [],
    products_cart: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.ADD_CART:
            let exists = state.products_cart.findIndex(x => x._id === action.product._id) > -1;

            let copyProducts = [...state.products];

            if (action.product.qty === action.product.stock) {
                let existsInProducts = state.products.findIndex(x => x._id == action.product._id) <= -1;
                copyProducts.splice(copyProducts.indexOf(existsInProducts, 1));
            }

            if (!exists) {
                return {
                    ...state,
                    products: copyProducts,
                    products_cart: [...state.products_cart, action.product]
                };
            } else {
                state.products_cart[state.products_cart.indexOf(exists)] = action.product

                return {
                    ...state,
                    products: copyProducts,
                    products_cart: [...state.products_cart]
                };
            }
        case Types.REMOVE_CART:
            let existsIdx = state.products_cart.findIndex(x => x._id == action.product._id) > -1;

            if (existsIdx) {
                let copyArrCart = [...state.products_cart];
                let copyArrProducts = [...state.products];

                if (action.product.qty < 1) {
                    copyArrCart.splice(copyArrCart.indexOf(existsIdx, 1));
                }

                copyArrCart[copyArrCart.indexOf(exists)] = action.product;

                if (action.product.qty !== action.product.stock) {
                    let existsInProducts = state.products.findIndex(x => x._id == action.product._id) <= -1;
                    if (existsInProducts) {
                        copyArrProducts[copyArrProducts.indexOf(exists)] = action.product;
                    }
                }

                return {
                    ...state,
                    products: [...copyArrProducts],
                    products_cart: [...copyArrCart]
                };
            } else {
                return state;
            }
        default:
            return state;
    }
};

export default cartReducer;
