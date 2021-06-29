import { ADD_TO_CART, UPDATECART, TOTAL_ITEM, CLEAR_ERRORS, CLEAR_MESSAGES } from './actionTypes'

export const addToCart = (product, quantity) => (dispatch, getState) => {
    dispatch({
        type: ADD_TO_CART,
        payload: {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0].url,
            stock: product.stock,
            quantity
        }
    })
    dispatch({ type: TOTAL_ITEM })
    localStorage.setItem('Cart-Items', JSON.stringify(getState().cart.cartItems))
}

export const updateCart = cartItems => (dispatch, getState) => {
    dispatch({ type: UPDATECART, payload: cartItems })
    dispatch({ type: TOTAL_ITEM })
    localStorage.setItem('Cart-Items', JSON.stringify(getState().cart.cartItems))
}

export const clearCartErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export const clearCartMessages = () => (dispatch) => {
    dispatch({ type: CLEAR_MESSAGES });
};