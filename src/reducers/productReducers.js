import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL, FETCH_MY_PRODUCTS_REQUEST, FETCH_MY_PRODUCTS_SUCCESS, FETCH_MY_PRODUCTS_FAIL, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAIL } from "../constants/productConstants";

export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return { loading: true }
        case FETCH_CATEGORIES_SUCCESS:
            return { loading: false, categories: action.payload }
        case FETCH_CATEGORIES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const categoryCreateReducer = (state = {success: false}, action) => {
    switch (action.type) {
        case CREATE_CATEGORY_REQUEST:
            return { loading: true }
        case CREATE_CATEGORY_SUCCESS:
            return { loading: false,success: true, category: action.payload }
        case CREATE_CATEGORY_FAIL:
            return { loading: false, errors: action.payload }
        default:
            return state
    }
}
export const productCreateReducer = (state = {success: false}, action) => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
            return { loading: true }
        case ADD_PRODUCT_SUCCESS:
            return { loading: false,success: true, product: action.payload }
        case ADD_PRODUCT_FAIL:
            return { loading: false, errors: action.payload }
        default:
            return state
    }
}
export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { loading: true }
        case FETCH_PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload.products, page: action.payload.page,
                pages: action.payload.pages, }
        case FETCH_PRODUCTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const productMyListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case FETCH_MY_PRODUCTS_REQUEST:
            return { loading: true }
        case FETCH_MY_PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload }
        case FETCH_MY_PRODUCTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const productDetailsReducer = (state = {product: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
export const productReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
            return { loading: true }
        case CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true}
        case CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


