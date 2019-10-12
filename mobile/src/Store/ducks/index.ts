import { combineReducers } from 'redux';

import main from './main';
import cart from './cart';

const reducers = combineReducers({
    main,
    cart
});

export default reducers;
