import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { allProductReducer, singleProductReducer } from './reducers/productReducers'
import { authReducers, userReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'

const reducers = combineReducers({
    allProducts: allProductReducer,
    singleProduct: singleProductReducer,
    auth: authReducers,
    user: userReducer,
    cart: cartReducer
})

const initialState = {

}

const middlewares = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store