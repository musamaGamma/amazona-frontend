import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`https://amazon-clone-node-api.herokuapp.com/api/orders`, order, config);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
    // localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.errors[0]
          ? error.response.data.errors[0].msg
          : error.message,
    });
  }
};

export const getOrder = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  const { data } = await axios.get(`https://amazon-clone-node-api.herokuapp.com/api/orders/${id}`, config);
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors[0].msg
          : error.message,
    });
  }
};
export const getOrders = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({
      type: GET_ORDERS_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  const { data } = await axios.get(`https://amazon-clone-node-api.herokuapp.com/api/orders/`, config);
    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors[0].msg
          : error.message,
    });
  }
};


export const payOrder = (orderId, token) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`https://amazon-clone-node-api.herokuapp.com/api/orders/${orderId}/pay`,{token}, config);
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
      error.response && error.response.data.errors
      ? error.response.data.errors[0].msg
      : error.message,
    });
  }
};