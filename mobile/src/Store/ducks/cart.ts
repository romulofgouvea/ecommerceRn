//Types
export const Types = {
    CART_ADD: "@cart/CART_ADD",
    DELETE_CART: "@cart/DELETE_CART",
    ADD_ADDRESS: "@cart/ADD_ADDRESS",
    PAY_METHOD: "@cart/PAY_METHOD",
    CLEAR_ALL: "@cart/CLEAR_ALL",
};

//Actions
export const Actions = {
    addCart(product) {
        return { type: Types.CART_ADD, product };
    },
    deleteCart(product) {
        return { type: Types.DELETE_CART, product };
    },
    addAddress(address) {
        return { type: Types.ADD_ADDRESS, address };
    },
    addPayment(pay) {
        return { type: Types.PAY_METHOD, pay };
    },
    clearAll() {
        return { type: Types.CLEAR_ALL };
    }
};

//Reducers
const INITIAL_STATE = {
    products_cart: [],
    total: 0,
    qty_total: 0,
    address_selected: {},
    pay_method: ""
};

//Utils
const calculateTotal = (cart) => {
    if (cart.length > 0) {
        let val = 0;
        for (let prod of cart) {
            val = val + (prod.qty * prod.price)
        }
        return val;
    }
    return 0;
}

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

            return { ...state, products_cart: [...copyCart], total: calculateTotal(copyCart), qty_total: copyCart.length };
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

            return { ...state, products_cart: [...copyCartInDelete], total: calculateTotal(copyCartInDelete), qty_total: copyCartInDelete.length };
        case Types.ADD_ADDRESS:
            return { ...state, address_selected: action.address };
        case Types.PAY_METHOD:
            return { ...state, pay_method: action.pay };
        case Types.CLEAR_ALL:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default cartReducer;
