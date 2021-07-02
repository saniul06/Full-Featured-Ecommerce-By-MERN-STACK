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
                laoding: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload

            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                message: false
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
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