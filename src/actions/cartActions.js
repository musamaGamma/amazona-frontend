import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants"



export const addToCart =(product, qty=1) => (dispatch) => {
    console.log({qty})
    if(!product.countInStock) qty = 0
    dispatch({type: CART_ADD_ITEM, payload:{  product:product._id,
        name:product.name,
        image:product.image,
        price:product.price,
        countInStock:product.countInStock, qty}})
}

export const removeFromCart = (id) => (dispatch) => {
    dispatch({type: CART_REMOVE_ITEM, payload: id})
}

export const saveShippingAddress = (data)=>(dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data})
}
export const savePaymentMethod = (data)=>(dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data})
}

