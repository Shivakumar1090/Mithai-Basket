const AddCartItem = (item) => {
    return {
        type: 'ADD_ITEM',
        payload: item,
    }
};

const DecreaseCartItem = (item) => {
    return {
        type: 'REMOVE_ITEM',
        payload: item,
    }
}

const DeleteCartItem = (item) => {
    return {
        type: 'DELETE_ITEM',
        payload: item,
    }
}

const ClearCart = () => {
    return {
        type: 'CLEAR',
        payload: {}
    }
}


export { AddCartItem, DeleteCartItem, DecreaseCartItem, ClearCart };