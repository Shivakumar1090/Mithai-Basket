const BASE_URL = process.env.REACT_APP_DOMAIN;

const GET_ORDERS = `${BASE_URL}/order/get`;
const GET_USER_ORDERS = `${BASE_URL}/order/get`
const CREATE_ORDER = `${BASE_URL}/order/create`;
const EDIT_ORDER = `${BASE_URL}/order/edit/`;

export { EDIT_ORDER, CREATE_ORDER, GET_USER_ORDERS, GET_ORDERS };