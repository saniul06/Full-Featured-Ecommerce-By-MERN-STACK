import { ADD_TO_CART, UPDATECART, CLEAR_ERRORS, TOTAL_ITEM, CLEAR_MESSAGES } from '../actions/actionTypes'

const init = {
    cartItems: localStorage.getItem('Cart-Items') ? JSON.parse(localStorage.getItem('Cart-Items')) : [],
    totalItems: localStorage.getItem('Cart-Items') ? JSON.parse(localStorage.getItem('Cart-Items')).reduce((acc, item) => item.quantity + acc, 0) : 0
}

export const cartReducer = (state = init, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload
            const isItemExists = state.cartItems.find(i => i._id === item._id)
            if (isItemExists) {
                return {
                    ...state,
                    cartMessage: 'Item already added in cart'
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    cartMessage: "Item added successfully"
                }
            }

        case UPDATECART:
            return {
                ...state,
                cartItems: action.payload
            }

        case TOTAL_ITEM: {
            return {
                ...state,
                totalItems: state.cartItems.reduce((acc, item) => item.quantity + acc, 0),
            }
        }

        case CLEAR_ERRORS:
            return {
                ...state,
                cartError: null,
            }

        case CLEAR_MESSAGES:
            return {
                ...state,
                cartMessage: null,
            }

        default:
            return state
    }
}