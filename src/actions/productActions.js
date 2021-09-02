import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAIL, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL, FETCH_MY_PRODUCTS_REQUEST, FETCH_MY_PRODUCTS_SUCCESS, FETCH_MY_PRODUCTS_FAIL, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_FAIL } from "../constants/productConstants"
import axios from "axios"

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CATEGORIES_REQUEST })
        const { data } = await axios.get("/api/categories")
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data })
    } catch (error) {
        console.log({ error })
        console.log(error.response && error.response.data.errors)
        dispatch({
            type: FETCH_CATEGORIES_FAIL,
            payload:
                error.response && error.response.data?.errors
                    ? error.response.data.errors[0].msg
                    : error.message
        });
    }

}

export const createCategory = (name) => async (dispatch, getState) => {
    console.log({name})
    try {
        dispatch({ type:CREATE_CATEGORY_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post("/api/categories",{name}, config)
        dispatch({ type:CREATE_CATEGORY_SUCCESS, payload: data })
    } catch (error) {
        console.log(error.message)
        
        dispatch({
            type:CREATE_CATEGORY_FAIL,
            payload:
                error.response && error.response.data?.errors
                    ? error.response.data?.errors
                    : error.message
        });
    }
}
export const addProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post("/api/products", product, config)
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        console.log(error.message)
        
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload:
                error.response && error.response.data?.errors
                    ? error.response.data?.errors
                    : error.message
        });
    }
}
export const fetchProducts = (category="", keyword ="", pageNumber=1) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCTS_REQUEST })


        const { data } = await axios.get( `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}`)
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data })
    } catch (error) {

        dispatch({
            type: FETCH_PRODUCTS_FAIL,
            payload:
                error.response && error.response.data?.errors
                    ? error.response.data?.errors[0].msg
                    : error.message
        });
    }
}
export const fetchMyProducts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_MY_PRODUCTS_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState();
   
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get( `/api/products/me`, config)
        console.log(data)
        dispatch({ type: FETCH_MY_PRODUCTS_SUCCESS, payload: data })
    } catch (error) {

        dispatch({
            type: FETCH_MY_PRODUCTS_FAIL,
            payload:
                error.response && error.response.data?.errors
                    ? error.response.data?.errors[0].msg
                    : error.message
        });
    }
}
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })


        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data?.errors
                    ? error.response.data?.errors[0].msg
                    : error.message
        });
    }
}

export const createReview = (productId, review) => async (
    dispatch,
    getState
) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();
        dispatch({ type: CREATE_REVIEW_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.put(`/api/products/${productId}/reviews`, review, config);

        dispatch({ type: CREATE_REVIEW_SUCCESS });
    } catch (error) {
        dispatch({
            type: CREATE_REVIEW_FAIL,
            payload:
            error.response && error.response.data?.errors
            ? error.response.data?.errors[0].msg
            : error.message
        });
    }
};