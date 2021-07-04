import axios from 'axios'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ADMIN_ORDER_REQUEST,
    ADMIN_ORDER_SUCCESS,
    ADMIN_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
    CLEAR_MESSAGES
} from './actionTypes';

export const createNewOrder = order => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/order/new', order, config)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order })
    } catch (err) {
        console.log(err)
        dispatch({ type: CREATE_ORDER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const myOrders = () => async dispatch => {
    try {
        dispatch({ type: MY_ORDER_REQUEST })
        const { data } = await axios.get('/api/v1/orders/me')
        dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders })
    } catch (err) {
        console.log(err)
        dispatch({ type: MY_ORDER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const adminOrders = () => async dispatch => {
    try {
        dispatch({ type: ADMIN_ORDER_REQUEST })
        const { data } = await axios.get('/api/v1/admin/orders')
        dispatch({ type: ADMIN_ORDER_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: ADMIN_ORDER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const orderDetails = id => async dispatch => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        console.log('id: ', id)
        const { data } = await axios.get(`/api/v1/order/${id}`)
        console.log('data is: ', data)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: ORDER_DETAILS_FAIL, payload: err.response.data.errorMessage })
    }
}

export const clearMessages = () => dispatch => {
    dispatch({ type: CLEAR_MESSAGES })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
