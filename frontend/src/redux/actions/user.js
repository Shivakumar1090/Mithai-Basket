export const Logout = () => {
    return {
        type: "LOGOUT",
        payload: {}
    }
}

export const UpdateUser = (payload) => {
    return {
        type: "UPDATE_USER",
        payload
    }
}