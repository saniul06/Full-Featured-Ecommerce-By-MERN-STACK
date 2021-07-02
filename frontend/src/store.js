import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { allProductReducer, singleProductReducer, newReviewReducer } from './reducers/productReducers'
import { authReducers, userReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { newOrderReducer, myOrderReducer, orderDetails } from './reducers/orderReducers'

const reducers = combineReducers({
    allProducts: allProductReducer,
    singleProduct: singleProductReducer,
    auth: authReducers,
    user: userReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetails,
    newReview: newReviewReducer
})

const initialState = {

}

const middlewares = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store