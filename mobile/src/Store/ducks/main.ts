//Types
export const Types = {
    PRODUCTS_ADD: "@ecommerce/PRODUCTS_ADD",
    PRODUCTS_DELETE: "@ecommerce/PRODUCTS_DELETE",
};

//Actions
export const Actions = {
    addProducts(list) {
        return { type: Types.PRODUCTS_ADD, list };
    },
    deleteProducts() {
        return { type: Types.PRODUCTS_DELETE };
    }
};

//Reducers
const INITIAL_STATE = {
    toggle_drawer: false,
    page_open: 'home',
    products: [],
};

const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.PRODUCTS_ADD:
            return { ...state, products: action.list }
        case Types.PRODUCTS_DELETE:
            return { ...state, products: [] }
        default:
            return state;
    }
};

export default mainReducer;
