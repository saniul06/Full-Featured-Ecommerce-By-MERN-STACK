import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCCESS,
    SINGLE_PRODUCT_FAIL,
    ADD_TO_CART,
    CLEAR_ERRORS
} from '../actions/actionTypes';

export const allProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                itemsPerPage: action.payload.itemsPerPage,
                totalProduct: action.payload.totalProduct,
                count: action.payload.count
            }

        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default: return state
    }
}

export const singleProductReducer = (state = {}, action) => {
    switch (action.type) {
        case SINGLE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }

        case SINGLE_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.product
            }

        case SINGLE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }

        default:
            return state
    }
}