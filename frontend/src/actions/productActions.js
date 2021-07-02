import axios from 'axios';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../actions/actionTypes';

export const getAllProducts = (currentPage = 1, keyword = '', price, category = '', ratings = 0) => async (dispatch) => {
    try {
        let url = `/api/v1/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`
        if (category) {
            url = `/api/v1/products?page=${currentPage}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}&category=${category}`
        }

        dispatch({ type: ALL_PRODUCTS_REQUEST });
        const { data } = await axios.get(url);
        dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: err.response.data.errorMessage
        });
    }
};

export const getSingleProduct = (id) => async dispatch => {
    try {
        dispatch({ type: SINGLE_PRODUCT_REQUEST });
        const { data } = await axios.get(`/api/v1/products/${id}`)
        dispatch({ type: SINGLE_PRODUCT_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: SINGLE_PRODUCT_FAIL, payload: err.response.data.errorMessage })
    }
}

export const newReview = review => async dispatch => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/review', review, config)
        dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.message })
    } catch (err) {
        console.log(err.response.data.errorMessage)
        dispatch({ type: NEW_REVIEW_FAIL, payload: err.response.data.errorMessage })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => (dispatch) => {
    dispatch({ type: NEW_REVIEW_RESET })
}
