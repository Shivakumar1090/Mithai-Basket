const { BASE_URL } = require("./client");

const ADD_PRODUCT = BASE_URL+"/products/add";
const GET_PRODUCTS = BASE_URL+"/products/";
const DELETE_PRODUCT = BASE_URL+"/products/delete/";
const EDIT_PRODUCT = BASE_URL+"/products/edit/";

export { 
    ADD_PRODUCT,
    GET_PRODUCTS,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
};
