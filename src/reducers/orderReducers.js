import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAIL } from "../constants/orderConstants";


export const orderCreateReducer = (state = {success: false}, action) => {
    switch(action.type) {
        case CREATE_ORDER_REQUEST:
            return {loading:true}
        case CREATE_ORDER_SUCCESS:
            return {loading: false,success: true, order: action.payload}
        case CREATE_ORDER_FAIL:
            return {loading: false, error: action.payload}
        default: 
         return state
    }
}
export const orderDetailsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_ORDER_REQUEST:
            return {loading:true}
        case GET_ORDER_SUCCESS:
            return {loading: false,success: true, order: action.payload}
        case GET_ORDER_FAIL:
            return {loading: false, error: action.payload}
        default: 
         return state
    }
}

export const orderListReducer = (state = {orders: []}, action) => {
    switch(action.type) {
        case GET_ORDERS_REQUEST:
            return {loading:true}
        case GET_ORDERS_SUCCESS:
            return {loading: false,success: true, orders: action.payload}
        case GET_ORDERS_FAIL:
            return {loading: false, error: action.payload}
        default: 
         return state
    }
}
export const orderPayReducer= (state= { success: false}, action)=> {

    switch(action.type) {

        case ORDER_PAY_REQUEST:
            return {loading: true}
        case ORDER_PAY_SUCCESS:
            return {loading:false,success:true, order: action.payload}
        case ORDER_PAY_FAIL: 
            return {loading: false, error: action.payload}
        default:
        return state
    }
}