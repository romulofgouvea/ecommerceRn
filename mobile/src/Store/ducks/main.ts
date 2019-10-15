//Types
export const Types = {
    PRODUCTS_ADD: "@main/PRODUCTS_ADD",
    PRODUCTS_DELETE: "@main/PRODUCTS_DELETE",
    MAIN_DRAWER: "@main/MAIN_DRAWER",
};

//Actions
export const Actions = {
    addProducts(list) {
        return { type: Types.PRODUCTS_ADD, list };
    },
    deleteProducts() {
        return { type: Types.PRODUCTS_DELETE };
    },
    setRouteDrawer(route) {
        return { type: Types.MAIN_DRAWER, route };
    }
};

//Reducers
const INITIAL_STATE = {
    toggle_drawer: false,
    route: 'Main',
    products: [],
};

const mainReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.PRODUCTS_ADD:
            return { ...state, products: action.list }
        case Types.PRODUCTS_DELETE:
            return { ...state, products: [] }
        case Types.MAIN_DRAWER:
            return { ...state, route: action.route }
        default:
            return state;
    }
};

export default mainReducer;
