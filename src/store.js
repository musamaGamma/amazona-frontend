import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { cartReducer } from "./reducers/cartReducer"
import { userloginReducer, userRegisterReducer } from "./reducers/userReducers"
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer } from "./reducers/orderReducers"
import { categoryListReducer, productCreateReducer, productListReducer, productDetailsReducer, productReviewReducer, productMyListReducer, categoryCreateReducer } from "./reducers/productReducers"

const reducer = combineReducers({
    cart: cartReducer,
    userLogin: userloginReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    categoryList: categoryListReducer,
    categoryCreate: categoryCreateReducer,
    productCreate: productCreateReducer,
    productDetails: productDetailsReducer,
    productList: productListReducer,
    productMyList: productMyListReducer,
    productReview: productReviewReducer
})
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
    userRegister: { userInfo: userInfoFromStorage }
}
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store