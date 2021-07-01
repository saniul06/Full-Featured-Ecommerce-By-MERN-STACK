import axios from 'axios'
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    CLEAR_MESSAGES
} from './actionTypes';

export const createNewOrder = order => async (dispatch, getState) => {
    try {
        console.log('why order is not working')
        dispatch({ type: CREATE_ORDER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/order/new', order, config)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (err) {
        console.log('error')
        console.log(err)
        dispatch({ type: CREATE_ORDER_FAIL, payload: err.response.data.errorMessage })
    }
}

export const clearMessages = () => dispatch => {
    dispatch({ type: CLEAR_MESSAGES })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
