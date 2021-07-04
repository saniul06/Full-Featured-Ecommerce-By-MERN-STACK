import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { allProductReducer, singleProductReducer, newReviewReducer, newProductReducer, updateProductReducer, deleteProductReducer } from './reducers/productReducers'
import { authReducers, userReducer, allUserReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { newOrderReducer, myOrderReducer, orderDetails, adminOrderReducer } from './reducers/orderReducers'

const reducers = combineReducers({
    allProducts: allProductReducer,
    newProduct: newProductReducer,
    updateProduct: updateProductReducer,
    deleteProduct: deleteProductReducer,
    singleProduct: singleProductReducer,
    auth: authReducers,
    user: userReducer,
    allUsers: allUserReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    adminOrders: adminOrderReducer,
    orderDetails: orderDetails,
    newReview: newReviewReducer
})

const initialState = {

}

const middlewares = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

export default store