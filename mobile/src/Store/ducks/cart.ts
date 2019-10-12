//Types
export const Types = {
    CART_ADD: "@ecommerce/CART_ADD",
    DELETE_CART: "@ecommerce/DELETE_CART"
};

//Actions
export const Actions = {
    addCart(product) {
        return { type: Types.CART_ADD, product };
    },
    deleteCart(product) {
        return { type: Types.DELETE_CART, product };
    }
};

//Reducers
const INITIAL_STATE = {
    products_cart: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.CART_ADD:
            let copyCart = [...state.products_cart];
            if (!action.product.qty || isNaN(action.product.qty)) {
                action.product.qty = 1
            } else if (parseInt(action.product.qty) < parseInt(action.product.stock)) {
                action.product.qty += 1
            } else {
                return state;
            }

            let idxProduct = copyCart.findIndex(p => p._id === action.product._id);
            if (idxProduct > -1) {
                copyCart[idxProduct] = action.product;
            } else {
                copyCart.push(action.product);
            }

            return { ...state, products_cart: [...copyCart] };
        case Types.DELETE_CART:
            let copyCartInDelete = [...state.products_cart];

            if (action.product.qty > 1) {
                action.product.qty -= 1;
                copyCartInDelete[idxProduct] = action.product;
            } else {
                let idxProductDelete = copyCartInDelete.findIndex(p => p._id === action.product._id);
                copyCartInDelete.splice(idxProductDelete, 1);
                action.product.qty = 0;
            }

            console.log(action.product);

            return { ...state, products_cart: [...copyCartInDelete] };
        default:
            return state;
    }
};

export default cartReducer;
